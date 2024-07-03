import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import Modal from "../Modal";
import { error } from "console";
import Select from "../Select";
import { Button } from "../ui/button";
type Props = {
	isOpen: boolean;
	onClose: () => void;
	users: User[];
};

const GroupModal = ({ isOpen, onClose, users }: Props) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
    setError,
		reset,
		watch,
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			members: [],
			isGroup: true,
		},
	});

	const members = watch("members");

	const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
		setIsLoading(true);
		axios
			.post("/api/conversations", {
				...data,
			})
			.then(() => router.refresh())
			.catch(() =>
				toast.error("Couldn't create Group", {
					id: "GroupCreation",
				})
			)
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal>
			<div className="w-96  relative bg-white rounded-md ">
				<form onSubmit={handleSubmit(onSubmit)} className="p-2 ">
					<div
						className="absolute right-2 top-2 cursor-pointer active:scale-105 transition-transform"
						onClick={onClose}
					>
						<X size={16}></X>
					</div>
					<h1 className="text-base md:text-lg font-medium">Create a Group</h1>
					<div className="flex flex-col gap-1 relative  py-4">
						<label htmlFor="name" className="text-gray-800">Group Name</label>
						<input
							className="border-gray-200 text-gray-600 border mb-1 p-1 rounded-md focus:outline-sky-400 focus:outline-1 focus:outline-offset-0"
							type="text"
              disabled={isLoading}
							placeholder="Group Name"
							{...register("name",{required:'Group Name is required',minLength:{value:2,message:'Name should be of atleast two characters'}})}
              
              
						/>
            {errors?.name && <p className="text-xs text-red-500 absolute bottom-0 left-1">{errors.name.message?.toString()}</p>}
					</div>
          <div>
            <Select disabled={isLoading} label="Members" value={members} options={users.map((user)=>({value:user.id,label:user.name}))} onChange={(value)=>setValue('members',value,{shouldValidate:true})}>

            </Select>
          </div>
          <div className="flex justify-end space-x-2 space-x-reverse gap-2 my-2">
            <Button className="bg-blue-600 text-white hover:bg-blue-400" type="submit" variant={'ghost'}>
              Create
            </Button>
            <Button className="" type="button" variant={'secondary'} onClick={onClose}>
              Cancel
            </Button>
            
          </div>
				</form>
			</div>
		</Modal>
	);
};

export default GroupModal;
