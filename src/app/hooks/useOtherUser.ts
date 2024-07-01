import {useSession} from "next-auth/react";
import { FullConversationType, FullMessageType } from "../types";
import { User } from "@prisma/client";
import { useMemo } from "react";

type userList={
  users:User[]
}
const useOtherUser = (conversation:FullConversationType|{
  users:User[]
} )=>{
  const session = useSession();
  const otherUser = useMemo(()=>{
    const currentUserEmail =session?.data?.user?.email;
    const otherUser = conversation.users.filter((user)=>user.email!==currentUserEmail);
    if(otherUser.length==0){
      // there was no other user involved in the conversation
      // it could be user chatting with himself.
      return conversation.users[0];
    }
    return otherUser[0];
  },[session?.data?.user?.email,conversation?.users]);
  return otherUser;
}

export default useOtherUser;