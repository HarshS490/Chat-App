"use client";
import { signOut } from "next-auth/react";
import React from "react";
import EmptyState from "../../../components/EmptyState";

type Props = {};

export default function page({}: Props) {
	return (
		<>
			<div className="hidden lg:block lg:pl-80 h-full">
				<EmptyState></EmptyState>
			</div>
		</>
	);
}
