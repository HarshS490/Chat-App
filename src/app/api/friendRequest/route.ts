import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";
import FriendRequest from "@/components/user/FriendRequest";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {receiver } = body;
    const currentUser = await getCurrentUser();
    if(!currentUser?.id || !currentUser?.email){
      return new NextResponse('Unauthorized',{status:401});
    }
    
    // check if friend request already exists
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        senderId: currentUser.id,
        receiverId: receiver.id,
      },
    });
    if (existingRequest) {
      return new NextResponse("Friend request already sent", { status: 400 });
    }

    const isFriends = await prisma.friendShip.findFirst({
      where:{
        OR:[
          {userId:currentUser.id,
            friendId:receiver.id,
          },
          {
            userId:receiver.id,
            friendId:currentUser.id
          }
        ]
      }
    });
    if(isFriends){
      return new NextResponse("Already friends",{status:400});
    }
    // create a friend Request and save in db;
    const newFriendRequest = await prisma.friendRequest.create({
      data: {
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        receiver: {
          connect: {
            id: receiver.id,
          },
        },
      },
      include:{
        sender:{
          select:{
            name:true,
            id:true,
            email:true,
            image:true,
          }
        },
        receiver:{
          select:{
            name:true,
            id:true,
            email:true,
            image:true,
          }
        }
      }
      
    });

    pusherServer.trigger(receiver.email,"friendRequest",newFriendRequest);
    console.log("friendRequest sent");
    return NextResponse.json({ newFriendRequest }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error creating friend Request", { status: 500 });
  }
}

