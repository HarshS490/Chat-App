import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb"
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(
  req:Request
){
  try {
    const body = await req.json();
    const currentUser =await getCurrentUser();

    const {
      message,
      image,
      conversationId
    } = body;

    if(!currentUser?.id || !currentUser?.email){
      return new NextResponse("Unauthorized",{status:401});
    }

    const newMessage = await prisma.message.create({
      data:{
        body:message,
        image:image,
        conversation:{
          connect:{
            id:conversationId
          }
        },
        sender:{
          connect:{
            id:currentUser.id
          }
        },
        seen:{
          connect:{
            id:currentUser.id
          }
        }
      },
      include:{
        seen:true,
        sender:true,
      }
    });

    // add the new message to the messages list of the conversation. 
    const updatedConversation = await prisma.conversation.update({
      where:{
        id:conversationId,
      },
      data:{
        lastMessageAt:new Date(),
        messages:{
          connect:{
            id:newMessage.id
          }
        }
      },
      include:{
        users:true,
        messages:{
          include:{
            seen:true,
          }
        }
      }
    });

    // channel for the chat room -> emit an event for new message .
    await pusherServer.trigger(conversationId,'newMessages',newMessage);
    
    //as new messages will be added at the end of the conversation list.
    const lastMessage = updatedConversation.messages[updatedConversation.messages.length-1]; 

    // 
    updatedConversation.users.map((user)=>{
      pusherServer.trigger(user.email,'updatedConversation',{
        id:conversationId,
        messages:[lastMessage]
      })
    })
    return NextResponse.json(newMessage,{status:200});
    
  } catch (error) {
    console.log("Error while Message creation: ",error);
    return new NextResponse('Internal Server Error',{status:500});
  }
}