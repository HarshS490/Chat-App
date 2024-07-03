"use client";
import axios from "axios";
import { FullMessageType } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import useConversation from "@/app/hooks/useConversation";
import toast from "react-hot-toast";
import { pusherClient } from "@/lib/pusher";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
type Props = {
	intialMessages: FullMessageType[];
};

const Body = ({ intialMessages }: Props) => {
	const [messages, setMessages] = useState(intialMessages);

	const bottomRef = useRef<HTMLDivElement>(null);
	const { conversationId } = useConversation();

	// send the request to set the last message as seen in db.
	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`).catch(() =>
			toast.error("Error", {
				id: "seen conversation fetching",
			})
		);
	}, [conversationId]);

	bottomRef.current?.scrollIntoView();
	
	// // subscribe the current user to the channel
	useEffect(()=>{
		pusherClient.subscribe(conversationId);
		
		const messageHandler = (newMessage:FullMessageType)=>{
			axios.post(`/api/conversations/${conversationId}/seen`)
			.catch((error)=>{
				console.log(error.message);
			})
			setMessages((prev)=>{
				const message = prev.filter((message)=> message.id===newMessage.id);
				if(message.length>0){
					return prev;
				}
				return [...prev,newMessage];
			});
					bottomRef.current?.scrollIntoView();

		}
		pusherClient.bind('newMessages',messageHandler);

		return ()=>{
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind('newMessages',messageHandler);
		}
	},[conversationId]);

	return (
		<div className="flex-1 overflow-y-auto">
			{messages.map((message, i) => (
				<MessageBox
					key={message.id}
					isLast={i === messages.length - 1}
					data={message}
				></MessageBox>
			))}
			<div ref={bottomRef} className="p-2"></div>
		</div>
	);
};

export default Body;
