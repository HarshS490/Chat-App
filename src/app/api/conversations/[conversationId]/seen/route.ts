import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
interface IParams {
	conversationId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser();
		const { conversationId } = params;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				messages: {
					include: {
						seen: true,
					},
				},
				users: true,
			},
		});
    if(!conversation){
      return new NextResponse('Invalid Id',{status:400});
    }

    //last message

    const lastMesage = conversation.messages[conversation.messages.length-1];

    if(!lastMesage){
      return NextResponse.json(conversation);
    }

    const updatedMessage  = await prisma.message.update({
      where:{
        id:lastMesage.id
      },
      include:{
        sender:true,
        seen:true,

      },
      data:{
        seen:{
          connect:{
            id:currentUser.id
          }
        }
      }
    })
	} catch (error) {
		console.log(error, "Error_Messages_SEEN");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
