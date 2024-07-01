import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import {HiCake, HiChat} from "react-icons/hi";
import {HiArrowLeftOnRectangle,HiUsers} from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import path from "path";

import {
  MessageCircle,
  SquareArrowLeft,
  UsersRound
} from "lucide-react"


const useRoutes=()=>{
  const pathname = usePathname();
  const {conversationId}  = useConversation();
  const routes = useMemo(()=>[{
    label:'Chat',
    href:'/conversations',
    icon: MessageCircle,
    active: pathname==='/conversations'|| !!conversationId,
  },{
    label:'users',
    href:'/users',
    icons:UsersRound,
    active: pathname==='/users'
  },
  {
    label:'Logout',
    href:'#',
    onClick:()=>signOut,
    icon:SquareArrowLeft
  }
],[pathname,conversationId]);
return routes;
}

export default useRoutes;