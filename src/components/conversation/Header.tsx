"use client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { ChevronLeftIcon,Ellipsis } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import Avatar from "../sidebar/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import GroupAvatar from "./GroupAvatar";
type Props = {
	conversation: Conversation & {
		users: User[];
	};
};

const Header = ({ conversation }: Props) => {
	const otherUser = useOtherUser(conversation);
	const [profileOpen,setProfileOpen] = useState<boolean>(false);
	
	const statusText = useMemo(() => {
		return "Active";
	}, []);
	return (
		<>

		<div>
			<ProfileDrawer data={conversation} isOpen={profileOpen} onClose={()=>setProfileOpen(false)}></ProfileDrawer>
			<div className="w-full flex border-b-[1px] py-2 sm:px-4 lg:px-6 justify-between items-center">
				<div className="flex gap-3 items-center">
					<Link
						href="/conversations"
						className="lg:hidden hover:bg-gray-100 rounded-md p-1"
					>
						<ChevronLeftIcon size={32} />
					</Link>
					{conversation.isGroup?<><GroupAvatar group={conversation}></GroupAvatar></>:<Avatar user={otherUser}></Avatar>}
					<div className="flex flex-col">
            <p className="text-base font-medium text-gray-900">
              {conversation.name||otherUser.name}
            </p>
            <p className="text-sm text-gray-600 ">
              {statusText}
            </p>
          </div>
				</div>
				<div className="active:scale-105 transition-transform" onClick={()=>setProfileOpen(!profileOpen)}>
					<Ellipsis></Ellipsis>
				</div>
			</div>
		</div>
		</>
	);
};

export default Header;
