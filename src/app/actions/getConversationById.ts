import prisma from '@/lib/prismadb'
import { getCurrentUser } from './getCurrentUser';

const getConverSationById = async (conversationId:string)=>{
  try {
    if(!conversationId) return null;
    const currentUser = await getCurrentUser();

    if(!currentUser?.email){
      return null;
    }

    const conversation =await prisma.conversation.findUnique({
      where:{
        id:conversationId,
      },
      include:{
        users:true
      }
    });
    
    return conversation;
  } catch (error) {
    console.log('Error while fetching the conversation ');
    return null;

  }

}

export default getConverSationById;