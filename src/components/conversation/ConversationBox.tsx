"use client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../sidebar/Avatar";
import { format, isBefore, isSameDay } from "date-fns";
import GroupAvatar from "./GroupAvatar";
type ConversationBoxProps = {
  data: FullConversationType;
  selected?: boolean;
};

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);

  const session = useSession();

  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    // array of the users who have seen the last message.
    const seenArray = lastMessage.seen || [];
    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);


  const time = useMemo(()=>{
    if(lastMessage && lastMessage.createdAt){
      const currenDate = new Date();
      const lastMessageDate = new Date(lastMessage.createdAt);
      if(isSameDay(lastMessageDate,currenDate)){
        return format(lastMessageDate,"p");
      }
      else{
        return format(lastMessageDate,"dd/MM/yy");
      }
    } 
    return "";
  },[data,lastMessage]);


  return (
    <div
      onClick={handleClick}
      className="w-full p-2 relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      {data.isGroup ? (
        <>
          <GroupAvatar group={data}></GroupAvatar>
        </>
      ) : (
        <Avatar user={otherUser}></Avatar>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex justify-between mb-1 items-center w-full">
          <div className="flex flex-col gap-1 w-full">
            <div>
              <p className="text-sm font-medium text-gray-900 overflow-hidden overflow-ellipsis">
                {data.name || otherUser?.name}
              </p>
            </div>
            <div className="text-xs flex justify-between gap-2 relative overflow-hidden  overflow-ellipsis">
              <p className="overflow-hidden overflow-ellipsis line-clamp-1 min-w-20">
                {lastMessageText}
              </p>
              {lastMessage?.createdAt && (
                <span className="text-xs block shrink-0">
                  {time}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
