"use client";
import axios from "axios";
import { FullMessageType } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import useConversation from "@/app/hooks/useConversation";
import toast from "react-hot-toast";
import { pusherClient } from "@/lib/pusher";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { ChevronDown, Loader2 } from "lucide-react";
import ScrollToBottom from "../ScrollToBottom";
type Props = {
  intialMessages?: FullMessageType[];
};

const Body = ({ intialMessages }: Props) => {
  const [messages, setMessages] = useState<FullMessageType[]>([]);
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView();
  };

  useEffect(() => {
    const data = axios
      .get(`/api/conversations/${conversationId}`)
      .then((res) =>{
        setMessages(res.data);
      })
      .catch(() => toast.error("Error fetching messages"))
      .finally(()=>setIsLoading(false));
    
    
  }, []);

  // send the request to set the last message as seen in db.
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`).catch(() =>
      toast.error("Error", {
        id: "seen conversation fetching",
      })
    );

   
  }, [conversationId]);

  // // subscribe the current user to the channel
  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (newMessage: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`).catch((error) => {
        console.log(error.message);
      });
      setMessages((prev) => {
        const message = prev.filter((message) => message.id === newMessage.id);
        if (message.length > 0) {
          return prev;
        }
        return [...prev, newMessage];
      });
    };
    pusherClient.bind("newMessages", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("newMessages", messageHandler);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if(isLoading){
    return(
      <div className="flex w-full h-full items-center justify-center">
        <Loader2 className="animate-spin"></Loader2>
      </div>
    )
  }  

  return (
    <div className="flex-1 overflow-y-auto px-7 mx-1 " ref={containerRef}>
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          data={message}
        ></MessageBox>
      ))}
      <div ref={bottomRef} className="p-2"></div>

      <ScrollToBottom
        containerRef={containerRef}
        threshold={100}
      ></ScrollToBottom>
    </div>
  );
};

export default Body;
