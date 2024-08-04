import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { connect } from "http2";
import { send } from "process";
import { request } from "http";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { senderEmail, receiver } = body;
  try {
    // find the senders data.
    const sender = await prisma.user.findUnique({
      where: {
        email: senderEmail,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    if (!sender) {
      return new NextResponse("No sender found ", { status: 400 });
    }

    // check if friend request already exists
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        senderId: sender.id,
        receiverId: receiver.id,
      },
    });
    if (existingRequest) {
      return new NextResponse("Friend request already sent", { status: 400 });
    }
    // create a friend Request and save in db;
    const newFriendRequest = await prisma.friendRequest.create({
      data: {
        sender: {
          connect: {
            id: sender.id,
          },
        },
        receiver: {
          connect: {
            id: receiver.id,
          },
        },
      },
    });

    return NextResponse.json({ newFriendRequest }, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error creating friend Request", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const body = await req.json();
  const userEmail = body.userEmail;
  try {
    if(!userEmail){
      return new NextResponse("Missing data in request",{status:400});
    }
    const requests = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        requestsRecieved: true,
        requestsSent: true,
      },
    });

    return NextResponse.json(requests,{status:200});
  } catch (error) {

    console.error(error);
    return new NextResponse("Error fetching friend requests",{status:500});
  }
}
