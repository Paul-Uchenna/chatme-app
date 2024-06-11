import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });

    return conversation;
  } catch (error: any) {
    console.error("Error fetching conversation by ID:", error);
    return null;
  }
};

export default getConversationById;
