import { FriendRequest } from "@prisma/client";
import { FullRequestType } from "../types";
import getSession from "./getSession";
import prisma from "@/lib/prismadb";


export default async function getRequests():Promise<FullRequestType[]|null> {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw Error("user session not found");
    }
    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select:{
        id:true,
      }
    });
    const requests = await prisma.friendRequest.findMany({
      where:{
        receiverId:user?.id
      },
      include:{
        sender:{
          select:{
            id:true,
            name:true,
            email:true,
            image:true,
          }
        },
        receiver:{
          select:{
            id:true,
            name:true,
            email:true,
            image:true,
          }
        },
      }

    })


    if (!requests) {
      return null;
    }
    return requests;
  } catch (error) {
    console.error(error);
    return null;
  }
}
