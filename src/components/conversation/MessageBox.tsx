import ConversationId from "@/app/(site)/conversations/[conversationId]/page";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, {
  MouseEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import { format } from "date-fns";
import ContextMenu from "./ContextMenu";
type Props = {
  data: FullMessageType;
  isLast?: boolean;
};

const MessageBox = ({ data, isLast }: Props) => {
  const session = useSession();
  // check if the message is sent by the user himeself.
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(",");

  const container = clsx("flex gap-1 p-1 ", isOwn && " justify-end");

  const body = clsx("flex flex-col gap-2 ", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden relative",
    isOwn
      ? "bg-sky-600 text-white rounded-l-2xl rounded-br-2xl"
      : "rounded-r-2xl rounded-bl-md bg-gray-100 self-start",
    data.image ? "rounded-md" : " py-2 px-3"
  );

  

  return (
    <div className={container}>
      <div className={body}>
        <div className="flex flex-col items-end gap-1 max-w-[400px] relative">
          

          <div
            className={
              isOwn
                ? "text-xs text-gray-500"
                : "text-xs text-gray-500 self-start"
            }
          >
            {data.sender.name}
          </div>
          <div
            className={
              isOwn
                ? "flex flex-row-reverse gap-2 "
                : "flex gap-2 "
            }
          >
            <div className={message}>
              {data.image ? (
                <>
                  <Image
                    alt="Image"
                    height="288"
                    width="288"
                    src={data?.image}
                    className="object-cover cursor-pointer  hover:scale-110 transition translate"
                  ></Image>
                </>
              ) : (
                <div className="">
                  <p>
                    {data.body}
                    &nbsp;
                  </p>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 font-semibold self-end flex-grow-0 flex-shrink-0">
              {format(new Date(data.createdAt), "p")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
