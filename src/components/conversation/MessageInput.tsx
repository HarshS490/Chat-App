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

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { conversationId } = useConversation();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
    reset
	} = useForm<FieldValues>({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {

		axios.post("/api/messages", {
			...data,
			conversationId,
		});

    reset();
	};

	

	return (
		<>
			<div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:pag-4 w-full">
				<div className="cursor-pointer bg-gray-300 p-1 rounded-md hover:opacity-75 transition">
					<ImageIcon></ImageIcon>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex items-center gap-2 w-full"
				>
					<div className="relative w-full flex gap-1 space-x-4 space-x-reverse">
						<input
							className="text-black font-light py-2 px-4 bg-neutral-50 w-full rounded-full focus:outline-none "
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
