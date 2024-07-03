"use client";
import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";

type DesktopItemProps = {
	label: string;
	icon: any;
	onClick?: () => void;
	active?: boolean;
	href: string;
};

export default function DesktopItem({
	label,
	icon: Icon,
	href,
	active,
	onClick,
}: DesktopItemProps) {
	const handleClick = () => {
		if (onClick) {
			toast.success('Signed out',{
				id:"signout"
			})
			return onClick();
		}
	};
	return (
		<>
			<li
				onClick={handleClick}
				className="group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100"
			>	
				<Link href={href}>
					<span>{label}</span>
				</Link>
			</li>
		</>
	);
}
