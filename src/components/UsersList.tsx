"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";
import UserBox from "./UserBox";
import { FullConversationType } from "@/app/types";
import FriendRequestModal from "./conversation/FriendRequestModal";
import FriendRequest from "./user/FriendRequest";
type Props = {
  items: User[];
};

const UsersList = ({ items }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ModalData, setModalData] = useState<User | null>(null);
  const handleModalOpen = (data: User) => {
    setModalData(data);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div>
        <div className="flex-col">
          <div className="text-2xl font-bol text-neutral-800 py-4">People</div>
        </div>
        <div className="flex flex-col">
          {items.map((item) => (
            <UserBox
              data={item}
              key={item.id}
              handleModalOpen={handleModalOpen}
            ></UserBox>
          ))}
        </div>
        <FriendRequestModal
          isOpen={isModalOpen}
          handleClose={handleModalClose}
          data={ModalData}
        ></FriendRequestModal>
      </div>
    </>
  );
};

export default UsersList;
