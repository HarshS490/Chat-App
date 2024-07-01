import React from "react";

type Props = {};

export default function EmptyState({}: Props) {
	return (
		<>
			<div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-100">
				<div className="text-center items-center felx flex-col">
					<h3 className="text-2xl font-medium text-gray-800">
						select a chat or start a new conversation.
					</h3>
				</div>
			</div>
		</>
	);
}
