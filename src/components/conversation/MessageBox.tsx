import ConversationId from "@/app/(site)/conversations/[conversationId]/page";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import {format} from "date-fns"
type Props = {
	data: FullMessageType;
	isLast?: boolean;
};

const MessageBox = ({ data, isLast }: Props) => {
	const session = useSession();
  // check if the message is sent by the user himeself.
	const isOwn = session?.data?.user?.email === data?.sender?.email;
	const seenList = (data.seen || []).filter(
		(user) => user.email !== data?.sender?.email
	)
  .map((user)=>user.name)
  .join(',');

  const container = clsx(
    "flex gap-3 p-4",
    isOwn&&" justify-end"
  );

  const body = clsx(
    "flex flex-col gap-2",isOwn&&"items-end"
  )

  const message=clsx(
    "text-sm w-fit overflow-hidden relative",isOwn?"bg-sky-600 text-white rounded-l-2xl rounded-r-md":"rounded-r-2xl rounded-l-md bg-gray-100",
    data.image?"rounded-md":" py-2 px-3"
  )

	return( 
  <div className={container}>
    <div className={body}>
      <div className="flex flex-col items-end gap-1">
        <div className="text-xs text-gray-500">
          {data.sender.name}
          
        </div>
        <div className={message}>
          {
            data.image?(
              <>
              <Image alt="Image" height="288" width="288" src={data?.image}
                className="object-cover cursor-pointer  hover:scale-110 transition translate"
              ></Image>
              <span className="absolute right-0 bottom-0">{format(new Date(data.createdAt),'p')}</span>
              </>
            ):(
              <div className="p-1">
                
                <p className=" mb-1 ">
                   {data.body}
                   &nbsp;
                </p>
                  <span className="text-[10px] mr-0 absolute right-1 bottom-0 min-w-max block">{format(new Date(data.createdAt),'p')}</span>
                

              </div>
            )
          }
          
        </div>
        {
          isLast && isOwn && seenList.length>0 && (
            <div className="text-xs font-light text-gray-500">
              seen
            </div>
          )
        }
      </div>
    </div>
  </div>
);
};

export default MessageBox;
