import getCurrentUser from "@/app/actions/getCurrentUser";
import Prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized: No current user found", {
        status: 401,
      });
    }

    if (!conversationId) {
      return new NextResponse("Bad Request: Missing conversation ID", {
        status: 400,
      });
    }

    const existingConversation = await Prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });

    if (!existingConversation) {
      return new NextResponse("Not Found: Invalid conversation ID", {
        status: 404,
      });
    }

    const deleteConversation = await Prisma.conversation.deleteMany({
      where: { id: conversationId, userIds: { hasSome: [currentUser.id] } },
    });

    if (deleteConversation.count === 0) {
      return new NextResponse(
        "Forbidden: You do not have permission to delete this conversation",
        { status: 403 }
      );
    }

    return NextResponse.json(deleteConversation);
  } catch (error: any) {
    console.log(error, "ERROR_CONVERSATION_DELETE");
    return new NextResponse(`Internal Server Error: ${error.message}`, {
      status: 500,
    });
  }
}
