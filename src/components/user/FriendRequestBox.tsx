"use client";
import { FullRequestType } from "@/app/types";
import { FriendRequest } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  request: FullRequestType;
};

const FriendRequestBox = ({ request }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const acceptRequest = async () => {
    setIsLoading(true);
    console.log(request);

    // TO DO : change the routes from "/conversation" to "/friendRequest/accept"
    axios
      .post("/api/conversations", {
        userId: request.senderId,
        friendRequest:{
          requestId:request.id,
          status:'accepted',
        },
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .catch((error) => {
        toast.error("Error while fetching data", {
          id: "conversation fetch",
        });
      })
      .finally(() => setIsLoading(false));
  };

  const declineRequest = async ()=>{
    // To DO : make a post request to "/friendRequest/decline"
  }
  return (
    <>
      <div className="flex gap-2 items-center  border-gray-200 rounded-xl w- max-w-max">
        <div>
          <Image
            className="rounded-full"
            src={request.sender.image || "/userplaceholder.jpg"}
            width={32}
            height={32}
            alt="avatar"
          />
        </div>
        <div className="flex justify-between gap-4 grow items-center">
          <div>
            <h2 className="font-semibold text-lg">{request.sender.name}</h2>
            <p className="text-xs">Sent a friend request</p>
          </div>
          {request.status === "pending" ? (
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant={"ghost"}
                className="bg-red-500 hover:bg-red-500/80 rounded-full w-7 h-7 "
                size={"icon"}
              >
                <X className="text-white"></X>
              </Button>
              <Button
                type="button"
                variant={"ghost"}
                size={"icon"}
                className="rounded-full bg-green-500 hover:bg-green-500/80 w-7 h-7"
                onClick={acceptRequest}
              >
                <Check className="text-white"></Check>
              </Button>
            </div>
          ) : (
            <p>{request.status}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendRequestBox;
