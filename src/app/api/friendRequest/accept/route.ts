import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { pusherServer } from "@/lib/pusher";
// change the status of friend request
// create a friendship entry

// create a new converstaion
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { friendRequestId, senderId, receiverId } = body;
    // if friend request not sent in request.
    if (!friendRequestId || !senderId || !receiverId) {
      return new NextResponse("missing friendRequest", { status: 400 });
    }
    const [requestDeletion,friendShip,conversation] = await prisma.$transaction([
      prisma.friendRequest.delete({
        where: { id: friendRequestId },
      }),
      prisma.friendShip.createMany({
        data: [
          {
            userId: senderId,
            friendId: receiverId,
          },
          { userId: receiverId, friendId: senderId },
        ],
      }),
      prisma.conversation.create({
        data:{
          users:{
            connect:[
              {id:senderId},
              {id:receiverId}
            ]
          }
        },
        include:{
          users:true,
        }
      })
    ]);
    if(!requestDeletion){
      return new NextResponse("error accepting request",{status:500});
    }
    if(!friendShip){
      return new NextResponse("error creating friendship",{status:500});
    }
    if(!conversation){
      return new NextResponse("error creating a conversation",{status:500})
    }

    conversation.users.map((user)=>{
      pusherServer.trigger(user.email,'newConversation',conversation);
    })

    return NextResponse.json(conversation,{status:200});
  } catch (error) {
    return new NextResponse("internal server error",{status:500});
  }
}
