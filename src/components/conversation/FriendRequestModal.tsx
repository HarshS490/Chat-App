import { FullConversationType } from "@/app/types";
import React, { useState } from "react";
import Modal from "../Modal";
import { User } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  handleClose: () => void;
  data: User | null;
  isOpen: boolean;
};

const FriendRequestModal = ({ handleClose, data, isOpen }: Props) => {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSend = () => {
    // TO DO : add the post request to create a friend request
    console.log("sending friend request");
    setIsLoading(true);
    axios
      .post("/api/friendRequest", {
        senderEmail: session.data?.user?.email,
        receiver: data,
      })
      .then(() => toast.success("Friend Request sent"))
      .then(() => handleClose())
      .catch((error) =>{
        toast.error(error.response.data);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <div className="rounded-xl shadow-sm  shadow-card bg-white w-3/4   min-w-60 p-4 max-w-sm">
          <div className="flex justify-between items-center mb-2">
            <h1 className="tracking-wide text-md sm:text-xl font-semibold">
              Friend Request
            </h1>
            <div>
              <Button
                type="button"
                variant={"ghost"}
                size={"icon"}
                className="rounded-full hover:bg-gray-400/40"
                onClick={handleClose}
                disabled={isLoading}
              >
                <X className="size-7"></X>
              </Button>
            </div>
          </div>
          <p className="mb-4">
            Send a friend request to{" "}
            <span className="text-sky-600 font-semibold">{data?.name}</span>?
          </p>
          <div className="flex justify-center gap-3">
            <Button
              disabled={isLoading}
              onClick={handleSend}
              type="button"
              variant={"default"}
              className="bg-green-700 hover:bg-green-700/85"
            >
              {isLoading ? <Loader2 className="animate-spin"></Loader2> : <></>}Send
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleClose}
              type="button"
              variant={"default"}
              className="bg-red-700 hover:bg-red-700/85"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FriendRequestModal;
