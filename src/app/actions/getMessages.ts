import { getCurrentUser } from "./getCurrentUser"


const getMessages = async (conversationId:string)=>{
  try {
    const messages = await prisma?.message.findMany({
      where:{
        conversationId:conversationId,

      },
      include:{
        sender:true,
        seen:true,
      },
      orderBy:{
        createdAt:"asc"
      }
    });
    if(!messages) return [];
    return messages;
  } catch (error) {
    return [];
  }
}

export default getMessages;