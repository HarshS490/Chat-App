import ConversationId from "@/app/(site)/conversations/[conversationId]/page";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, {
  MouseEventHandler,
  ReactEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { format } from "date-fns";
import ContextMenu from "./ContextMenu";
import Modal from "../Modal";
import { X } from "lucide-react";
import { Button } from "../ui/button";
type Props = {
  data: FullMessageType;
  isLast?: boolean;
};

const MessageBox = ({ data, isLast }: Props) => {
  const session = useSession();

  // check if the message is sent by the user himeself.
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = useCallback(
    () =>
      (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(","),
    [data]
  );

  // classes for message box
  const container = clsx("flex gap-1 p-1 ", isOwn && " justify-end");
  const body = clsx("flex flex-col gap-2 ", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden relative",
    isOwn
      ? "bg-[#0F54AE] text-white rounded-l-2xl rounded-br-2xl"
      : "rounded-r-2xl rounded-bl-md bg-gray-100 self-start",
    data.image
      ? "rounded-md shadow-md shadow-border border border-gray-300"
      : " py-2 px-3"
  );

  // state logic for image modal.
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={container}>
      <div className={body}>
        <div className={isOwn?"flex flex-col items-end gap-1 max-w-md md:max-w-lg":"flex flex-col items-start gap-1 max-w-md md:max-w-lg"}>
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
            className={isOwn ? "flex flex-row-reverse gap-2 " : "flex gap-2 "}
          >
            <div className={message}>
              {data.image ? (
                <>
                  <div>
                    <Image
                      alt="Image"
                      height={500}
                      width={500}
                      src={data?.image}
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw,33vw"
                      className=" object-cover cursor-pointer  hover:scale-110 transition translate"
                      onClick={handleModalOpen}
                    ></Image>
                    <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
                      
                        <div className="text-slate-700 flex justify-end mb-1">
                          <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="rounded-full hover:bg-gray-400/40"
                            onClick={handleModalClose}
                          >
                            <X className="size-8"></X>
                          </Button>
                        </div>
                        <div className="relative w-3/5 h-40 sm:h-64 sm:w-96 md:h-96 md:w-[700px] md:max-w-5xl rounded-xl overflow-hidden">
                          <Image
                            alt="image"
                            fill={true}
                            src={data?.image}
                            className=" object-fill sm:object-fill h-auto"
                          ></Image>
                        </div>
                    </Modal>
                  </div>
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
