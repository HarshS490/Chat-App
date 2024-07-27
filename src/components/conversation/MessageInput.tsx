"use client";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  ImageIcon,
  PlaneIcon,
  SendHorizonalIcon,
  SendIcon,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import Modal from "../Modal";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { conversationId } = useConversation();

  const [isModelOpen, setIsModalOpen] = useState(false);

  const handleClose = (e:React.MouseEvent<HTMLElement,MouseEvent>)=>{
    e.stopPropagation();
    setIsModalOpen(false);
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.message.trim().length == 0) return;

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });

    reset();
  };

  const uploadHandler = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <>
      <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:p-4 w-full">
        <div className="cursor-pointer bg-gray-300 p-1 rounded-md hover:opacity-75 transition">
          <label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={()=>setIsModalOpen(true)}
            ></input>
            <ImageIcon></ImageIcon>
          </label>
          <div>
            <Modal isOpen={isModelOpen} handleClose={handleClose}>
              <div>
                This is an image preview
              </div>
            </Modal>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 w-full"
        >
          <div className="w-full flex gap-1 space-x-4 space-x-reverse">
            <input
              className="font-light py-2 px-4 bg-gray-200/85 text-black w-full rounded-full focus:outline-none "
              id="message"
              placeholder="Message..."
              {...register("message")}
            />
            <button
              type="submit"
              className="rounded-full bg-blue-500 hover:opacity-75 transition p-2"
            >
              <SendHorizonalIcon className=""></SendHorizonalIcon>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
