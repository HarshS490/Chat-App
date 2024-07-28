"use client";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  ImageIcon,
  Info,
  PlaneIcon,
  SendHorizonalIcon,
  SendIcon,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import Modal from "../Modal";
import ImagePreviewModal from "./ImagePreviewModal";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { UploadImage } from "@/lib/upload-image";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { conversationId } = useConversation();
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

  const [isModelOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const validImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
  ];

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    handleRemoveAllFiles();
    setIsModalOpen(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const selectedFiles = Array.from(event.target.files || []);

    let isAllValidTypes = true;
    selectedFiles.forEach((file) => {
      if (validImageTypes.includes(file.type)) {
        const reader = new FileReader();
        setFileList((prev) => [...prev, file]);
        reader.onloadend = () => {
          setPreview((prev) => [...prev, reader.result as string]);
        };

        reader.readAsDataURL(file);
      } else {
        isAllValidTypes = false;
      }
    });

    if (!isAllValidTypes) {
      toast.error("Invalid file types were not loaded");
    }

    if (selectedFiles.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleRemoveAllFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileList([]);
    setPreview([]);
  };

  const uploadHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (fileList && fileList.length > 0) {
        formData.append("image", fileList[0]);
        console.log(formData.get("image"));
        console.log("uploading data to cloudinary");
        handleRemoveAllFiles();
        setIsModalOpen(false);
        const res = await axios.post("/api/cloudinaryUpload", formData);
        const data = res.data;
        axios.post("/api/messages", {
          ...data,
          conversationId,
        });
      } else {
        toast("Select a file to upload",{
          id:'NofileSelected',
          icon: <Info className="text-[#f9e154]"></Info>
        })
      }
    } catch (error) {
      toast.error("Error while sending file");
      console.log(error);
    }
  };

  return (
    <>
      <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:p-4 w-full">
        <form onSubmit={uploadHandler}>
          <div className="cursor-pointer bg-gray-300 p-1 rounded-md hover:opacity-75 transition">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              ></input>
              <ImageIcon></ImageIcon>
            </label>
          </div>
          <Modal isOpen={isModelOpen} handleClose={handleClose}>
            <div className="w-96 bg-white rounded-xl p-3">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium">Send Image</h1>
                <Button
                  type="button"
                  variant={"ghost"}
                  className="rounded-full"
                  size={"icon"}
                  onClick={handleClose}
                >
                  <X></X>
                </Button>
              </div>
              <div className="flex flex-col items-center py-4 ">
                {preview.map((imageUrl, ind) => {
                  return (
                    <>
                      <div key={imageUrl} className="relative">
                        <Image
                          loading="lazy"
                          src={imageUrl}
                          alt="previewImage "
                          // fill
                          width={200}
                          height={120}
                          draggable={"false"}
                          className="w-72 h-40 block rounded-lg border border-sky-600 object-fit"
                        ></Image>
                        <p className="text-sm py-1">
                          <Link
                            href={imageUrl}
                            className="hover:underline hover:underline-offset-1"
                          >
                            {fileList[ind].name}
                          </Link>
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="flex mt-2 justify-center">
                <Button
                  variant={"default"}
                  className="bg-sky-600 hover:bg-sky-600/80 text-white tracking-wide"
                  type="submit"
                >
                  Send
                </Button>
              </div>
            </div>
          </Modal>
        </form>

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
