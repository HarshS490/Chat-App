"use client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import Avatar from "../sidebar/Avatar";

type Props = {
	conversation: Conversation & {
		users: User[];
	};
};

const Header = ({ conversation }: Props) => {
	const otherUser = useOtherUser(conversation);
	const statusText = useMemo(() => {
		return "Active";
	}, [conversation]);
	return (
		<div>
			<div className="w-full flex border-b-[1px] py-2 sm:px-4 lg:px-6 justify-between">
				<div className="flex gap-3 items-center">
					<Link
						href="/conversations"
						className="lg:hidden hover:bg-gray-100 rounded-md p-1"
					>
						<ChevronLeftIcon size={32} />
					</Link>
					<Avatar user={otherUser}></Avatar>
					<div className="flex flex-col">
            <p className="text-base font-medium text-gray-900">
              {conversation.name||otherUser.name}
            </p>
            <p className="text-sm text-gray-600">
              {statusText}
            </p>
          </div>
				</div>
			</div>
		</div>
	);
};

export default Header;
