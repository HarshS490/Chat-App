import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"


export async function POST(req:Request){
  try {
    const currentUser =await getCurrentUser();

    const body = await req.json();

    const {
      userId,
      isGroup,
      members,
      name
    } = body;

    if(!currentUser?.id || !currentUser?.email){
      return new NextResponse('Unauthorized',{status:401});
    }

    if(isGroup && (!members || members.length||!name)){
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
          }
        ]
      }}
    );
    
    const singleConversation = existingConversation[0];
    
    if(singleConversation){
      return NextResponse.json(singleConversation,{status:200});
    }

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

    return NextResponse.json(newConversation,{status:200});

  } catch (error) {
    return  new NextResponse("Internal Server Error",{status:500});
  }
}