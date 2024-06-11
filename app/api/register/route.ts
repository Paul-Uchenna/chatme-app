import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { log } from "console";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 404 });
    }

    const hashedpassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedpassword,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "Registration error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
