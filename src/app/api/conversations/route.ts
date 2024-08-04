import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { pusherClient, pusherServer } from "@/lib/pusher";


export async function POST(req:Request){
  try {
    const currentUser =await getCurrentUser();

    const body = await req.json();

    const {
      userId,
      isGroup,
      members,
      name,
      friendRequest
    } = body;

    if(!currentUser?.id || !currentUser?.email){
      return new NextResponse('Unauthorized',{status:401});
    }
    console.log(userId,isGroup,members,name);
    if(isGroup && (!members || members.length<1 ||!name)){
      return new NextResponse('invalid data',{status:400});
    }

    if(isGroup){
      const newConversation = await prisma.conversation.create({
        data:{
          name,
          isGroup,
          users:{
            connect:[
                ...members.map((member:{value:string})=>({
                  id:member.value
                }))
              ,
              {
                id:currentUser.id
              }
            ]
          }
        },
        include:{
          users:true
        }
      });

      newConversation.users.map((user)=>{
        if(user.email){
          pusherServer.trigger(user.email,'newConversation',newConversation);
        }
      })

      return NextResponse.json(newConversation);
    }

    const existingConversation = await prisma.conversation.findMany(
      {where:{
        OR:[
          {
            userIds:{
              equals:[currentUser.id,userId]
            }
          },{
            userIds:{
              equals:[userId,currentUser.id]
            }
          },{
            userIds:{
              equals:[currentUser.id]
            }
          }
        ]
      }}
    );
    
    const singleConversation = existingConversation[0];
    
    if(singleConversation){
      return NextResponse.json(singleConversation,{status:200});
    }

    // acccept friend request;
    if(!friendRequest){
      return new NextResponse("Cannot create converstaion without friend request",{status:400});
    }
    const acceptRequest = await prisma.friendRequest.update({
      where:{
        id:friendRequest.requestId,
      },
      data:{
        status:friendRequest.status,
      }
    });
    if(!acceptRequest){
      return new NextResponse("failed to accept request",{status:500});
    }
    // emit the 

    const newConversation = await prisma.conversation.create({
      data:{
        users:{
          connect:[
            {id:currentUser.id},
            {id:userId}
          ]
        }
      },
      include:{
        users:true
      }
    });
    
    // triggering the newConversation event so that all the users related to chat room
    // are shown they are part of that chatroom.
    newConversation.users.map((user)=>{
      pusherServer.trigger(user.email,'newConversation',newConversation);
    })

    return NextResponse.json(newConversation,{status:200});

  } catch (error) {
    return  new NextResponse("Internal Server Error",{status:500});
  }
}