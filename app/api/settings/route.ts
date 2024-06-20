import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentUser) {
      return new NextResponse("Unauthorized: No current user found", {
        status: 401,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { image: image, name: name },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error, "ERRORS_SETTINGS");
    return new NextResponse("Internal errors", { status: 500 });
  }
}
