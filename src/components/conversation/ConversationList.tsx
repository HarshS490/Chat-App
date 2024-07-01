"use client";
import { FullConversationType } from "@/app/types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import getConversations from "@/app/actions/getConversations";
import useConversation from "@/app/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
type Props = {
	initialItems: FullConversationType[];
};

const ConversationList = ({ initialItems }: Props) => {
	const [items, setItems] = useState(initialItems);

	const router = useRouter();

	const { conversationId, isOpen } = useConversation();
	return (
		<aside
			className={
				isOpen
					? "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 w-80 lg:block overflow-y-auto border-r border-gray-200 hidden"
					: "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 w-80 lg:block overflow-y-auto border-r border-gray-200 block"
			}
		>
			<div className="px-5">
				<div className="flex justify-between mb-4 pt-4 ">
					<div className="text-2xl font-semibold text-neutral-800 ">
						Messages
					</div>
					<div className="cursor-pointer bg-gray-200 rounded-md p-2 hover:opacity-75 transition-colors ">
						<MdOutlineGroupAdd size={20}/>
					</div>
				</div>

        {
          items.map((item)=>(
            <ConversationBox key={item.id} data ={item} selected={conversationId===item.id}/>
          ))
        }
			</div>
		</aside>
	);
};

export default ConversationList;
