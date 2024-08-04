import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import getUsers from "@/app/actions/getUsers";
import UsersList from "@/components/UsersList";
import FriendRequest from "@/components/user/FriendRequest";
import Accordion from "@/components/Accordion";
type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
						
					<div className="lg:hidden">
						<FriendRequest></FriendRequest>
					</div>
          <div className="px-5">
            <UsersList items={users}></UsersList>
          </div>
        </aside>
				
        <div className="hidden lg:block lg:pl-80 h-full">
          <FriendRequest></FriendRequest>
        </div>
      </div>
    </Sidebar>
  );
}
