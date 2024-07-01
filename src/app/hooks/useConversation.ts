import { useParams } from "next/navigation";
import { useMemo } from "react";

/**
 * @returns conversationId and isOpen value for the current coversation
*/ 
const useConversation = ()=>{
  const params = useParams();
  const conversationId = useMemo(()=>{
    if(!params?.conversationId){
      return '';
    }
    return params.conversationId as string;
  },[params?.conversationId]);

  const isOpen = useMemo(()=>!!conversationId,[conversationId]);

  return useMemo(()=>({
    isOpen,
    conversationId,

  }),[isOpen,conversationId]);
}

export default useConversation;