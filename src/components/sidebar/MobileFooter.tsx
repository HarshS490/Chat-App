"use client";

import useConversation from "@/app/hooks/useConversation";
import MobileItem from "./MobileItem";
import useRoutes  from "@/app/hooks/useRoutes";

const MobileFooter = ()=>{
  const routes = useRoutes();
  const {isOpen} = useConversation();

  if(isOpen){
    return null;
  }

  return (
    <>
      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center border-t-[1px] lg:hidden">
          {routes.map((route)=>(
            <MobileItem key={route.href} icon = {route.icon} href={route.href} active = {route.active} label={route.label} onClick={route.onClick}></MobileItem>
          ))}
      </div>
    </>
  )

}

export default MobileFooter;