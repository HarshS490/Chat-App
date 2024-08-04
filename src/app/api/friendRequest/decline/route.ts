import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prismadb"
import { pusherClient, pusherServer } from "@/lib/pusher";
// delete the friend request
export async function POST(req:NextRequest){
  try {
    const body = await req.json(); 
    const {friendRequestId} = body;
    if(!friendRequestId){
      return new NextResponse("missing friend request information",{status:400});
    }
    const declinedRequest = await prisma?.friendRequest.delete({
      where:{
        id:friendRequestId,
      },
      include:{
        receiver:{
          select:{
            id:true,
            email:true,
            name:true,
            image:true,
          }
        },
        sender:{
          select:{
            id:true,
            email:true,
            image:true,
            name:true,
          }
        }
      }

    })
    if(!declinedRequest){
      return new NextResponse("couldn't decline request",{status:500});

    }

    pusherServer.trigger(declinedRequest.receiver.email,"declineRequest",declinedRequest);

    return NextResponse.json("declined friend request",{status:200});
  } catch (error) {
    return new NextResponse("Internal Server Error",{status:500});
  }
}