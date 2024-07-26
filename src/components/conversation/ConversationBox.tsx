"use client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../sidebar/Avatar";
import { format } from "date-fns";
import GroupAvatar from "./GroupAvatar";
type ConversationBoxProps = {
	data: FullConversationType;
	selected?: boolean;
};

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
	const otherUser = useOtherUser(data);

	const session = useSession();

	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`);
	}, [data.id, router]);

	const lastMessage = useMemo(() => {
		const messages = data.messages || [];
		return messages[messages.length - 1];
	}, [data.messages]);

	const userEmail = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	const hasSeen = useMemo(() => {
		if (!lastMessage) {
			return false;
		}
		// array of the users who have seen the last message.
		const seenArray = lastMessage.seen || [];
		if (!userEmail) {
			return false;
		}

		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [userEmail, lastMessage]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return "Image";
		}
		if (lastMessage?.body) {
			return lastMessage.body;
		}

		return "Started a conversation";
	}, [lastMessage]);
	return (
		<div
			onClick={handleClick}
			className="w-full p-2 relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
		>
			{data.isGroup?<><GroupAvatar group={data}></GroupAvatar></>:<Avatar user={otherUser}></Avatar>}
			<div className="min-w-0 flex-1">
				<div className="flex justify-between mb-1 items-center w-full">
					<div className="flex flex-col gap-1 w-full">
						<div className="flex justify-between items-center">
							<p className="text-sm font-medium text-gray-900">{data.name || otherUser?.name}</p>
							{lastMessage?.createdAt && (
								<span className="text-xs absolute right-0 ">{format(new Date(lastMessage.createdAt),'p')}</span>
								)}
						</div>
						<div className="text-xs flex relative overflow-hidden  overflow-ellipsis">
							<p className="overflow-hidden overflow-ellipsis line-clamp-1">{lastMessageText}</p>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConversationBox;
