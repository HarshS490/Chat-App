import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function GET(
  req: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const messages = await prisma?.message.findMany({
      where: {
        conversationId: conversationId,
      },

      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if(!messages){
      return new NextResponse('Invalid id',{status:400});
    }

    return NextResponse.json(messages,{status:200});
  } catch (error) {
    console.log("error while fetching messages ",error);
    return new NextResponse('Internal Error',{status:500});
  }
}
