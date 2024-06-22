import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { use } from "react";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, IsGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("User not authenticated", { status: 401 });
    }

    if (IsGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse(
        "Invalid group data: A group must have a name and at least 2 members",
        { status: 400 }
      );
    }

    if (IsGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          IsGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              { id: currentUser.id },
            ],
          },
        },
        include: { users: true },
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { userIds: { equals: [currentUser.id, userId] } },
          { userIds: { equals: [userId, currentUser.id] } },
        ],
      },
      // include: { users: true },
    });

    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: { connect: [{ id: currentUser.id }, { id: userId }] },
      },
      include: { users: true },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    console.error(error);
    return new NextResponse(
      "An unexpected error occurred while creating the conversation",
      { status: 500 }
    );
  }
}
