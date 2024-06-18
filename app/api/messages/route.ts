import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { body: messageBody, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      console.error("Unauthorized request: No current user found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Vérifiez si le corps du message est présent
    if (!messageBody && !image) {
      console.error("Bad Request: Missing message body or image in request");
      return new NextResponse("Bad Request: Missing message body or image", {
        status: 400,
      });
    }

    // Créez le nouveau message avec Prisma
    const newMessage = await prisma.message.create({
      data: {
        body: messageBody,
        image: image,
        createdAt: new Date(),
        conversation: { connect: { id: conversationId } },
        sender: { connect: { id: currentUser.id } },
        seen: { connect: { id: currentUser.id } },
      },
      include: { seen: true, sender: true },
    });

    // Mettez à jour la conversation pour inclure le nouveau message
    const updateConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } },
      },
      include: { users: true, messages: { include: { seen: true } } },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
