"use client";
import axios from "axios";
import { FullMessageType } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import useConversation from "@/app/hooks/useConversation";

type Props = {
	intialMessages: FullMessageType[];
};

const Body = ({ intialMessages }: Props) => {
	const [messages, setMessages] = useState(intialMessages);

	const bottomRef = useRef<HTMLDivElement>(null);
	const { conversationId } = useConversation();
	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	},[conversationId]);
	return (
		<div className="lg:pl-80 h-full">
			<div className="h-full flex flex-col">
				{messages.map((message, i) => (
					<MessageBox
						key={message.id}
						isLast={i === messages.length - 1}
						data={message}
					></MessageBox>
				))}
			</div>
		</div>
	);
};

export default Body;
