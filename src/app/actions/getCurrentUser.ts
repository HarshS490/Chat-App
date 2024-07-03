import prisma from '@/lib/prismadb'
import getSession from './getSession';
import { authOptions } from '@/lib/authOptions';

export const getCurrentUser = async ()=>{
  try{
    const session = await getSession();
    
    if(!session?.user?.email){
      return null;
    }
    const currentUser  = await prisma.user.findUnique({
      where:{
        email:session.user.email
      }
    }) ;

    // console.log('current user:',currentUser);
    if(!currentUser){
      return null;
    }
    return currentUser;
  }catch(error){
    return null;
  }
} 