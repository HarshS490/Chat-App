import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import getUsers from "@/app/actions/getUsers";
import UsersList from "@/components/UsersList";
type Props = {
	children: React.ReactNode;
};

export default async function layout({ children }: Props) {
	const users = await getUsers();
	
	return (
		<Sidebar>
			<div className="h-full">
				<UsersList items={users}></UsersList>
				{children}
			</div>
		</Sidebar>
	);
}
