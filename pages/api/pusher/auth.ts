import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const session = await getServerSession(request, response, authOptions);

    if (!session?.user?.email) {
      return response
        .status(401)
        .json({ message: "Unauthorized: No session or user email found" });
    }

    const { socket_id: socketId, channel_name: channel } = request.body;
    const data = { user_id: session.user.email };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

    return response.send(authResponse);
  } catch (error: any) {
    return response.status(500).json({
      message: "Error authorizing Pusher channel",
      error: error.message,
    });
  }
}
