import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { hash } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    // check if the user already exist
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    });
    if(user){
        return new NextResponse("User Already exists",{status:400});
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        email,
        name: name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log(error,'error occured while registering user');
    return new NextResponse("Internal Server error",{status:500});
  }
}
