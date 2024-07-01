import prisma from "@/lib/prismadb"

import { getCurrentUser } from "./getCurrentUser"

/**
 * @returns Conversation[]
 * a conversation represents a chat room, includes the
 * chatroom id messages list, users list, chat room name
 * This function returns a Converstaion lists by populating 
 * the messages and senders
 */
const getConversations = async ()=>{
  const currentUser = await getCurrentUser();
  if(!currentUser?.id){
    return [];
  }

  try {
		const conversation = await prisma.conversation.findMany({
			orderBy: {
				createdAt: "desc",
			},
      where:{
        userIds:{
          has:currentUser.id
        }
      },
      include:{
        users:true,
        messages:{
          include:{
            sender:true,
            seen:true,
          }
        }
      }
			
		});
    
		return conversation;
	} catch (error) {
    return [];
  }
}
export default getConversations;