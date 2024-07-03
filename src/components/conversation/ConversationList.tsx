"use client";
import { FullConversationType } from "@/app/types";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getConversations from "@/app/actions/getConversations";
import useConversation from "@/app/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupModal from "./GroupModal";
import { User } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { useSession } from "next-auth/react";
type Props = {
	initialItems: FullConversationType[];
	users:User[];
};

const ConversationList = ({ initialItems,users }: Props) => {
	const [items, setItems] = useState(initialItems);
	const [isGroupModalOpen,setIsGroupModalOpen] = useState<boolean>(false);
	const router = useRouter();
	const { conversationId, isOpen } = useConversation();

	const session = useSession();

	const pusherChannel = useMemo(()=>session.data?.user?.email,[session.data?.user?.email]) ;
	console.log('pusher channel:',pusherChannel);
	useEffect(()=>{
		console.log('subscribing to pusher');
		if(!pusherChannel) return;

		pusherClient.subscribe(pusherChannel);

		
		const newConversationHandler = (newConversation:FullConversationType)=>{
			setItems((prev)=>{
				// search the newly created conversation
				const conversation =  prev.filter((conversation)=>conversation.id===newConversation.id);
				if(conversation.length>0){
					return prev;
				}

				return [...prev,newConversation];
			})
		} 

		const updatedConversationHandler = (updatedConversation:FullConversationType)=>{
			console.log('Updating conversation list');
			setItems((prev)=>prev.map((conversation)=>{
				if(conversation.id===updatedConversation.id){
					return {
						...conversation,
						messages: updatedConversation.messages,
					}
				}

				return conversation;
			}))
		}

		pusherClient.bind('newConversation',newConversationHandler);
		pusherClient.bind('updatedConversation',updatedConversationHandler);

		return ()=>{
			pusherClient.unsubscribe(pusherChannel);
			pusherClient.unbind('newConversation',newConversationHandler);
			pusherClient.unbind('updatedConversation',updatedConversationHandler);
		} 

	},[pusherChannel]);

	return (
		<>
		{isGroupModalOpen&&<GroupModal isOpen={isGroupModalOpen} onClose={()=>setIsGroupModalOpen(false)} users={users}></GroupModal>}
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
					<div className="cursor-pointer bg-gray-200 rounded-md p-2 hover:opacity-75 transition-colors " onClick={()=>setIsGroupModalOpen(true)}>
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
		</>  
	);
};

export default ConversationList;
