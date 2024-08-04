import getRequests from "@/app/actions/getRequests";
import { FullRequestType } from "@/app/types";
import { useSession } from "next-auth/react";
import { getRedirectStatusCodeFromError } from "next/dist/client/components/redirect";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FriendRequestBox from "./FriendRequestBox";
import { request } from "http";

type Props = {};

const FriendRequest = async (props: Props) => {
  const requests = await getRequests();
  // console.log(requests?.requestsRecieved);
  return (
    <div className="py-4 px-6">
      <h1 className=" text-2xl tracking-wide font-semibold mb-7 min-w-max">
        Friend Requests
      </h1>
      <div className="px-1">
        {requests && requests.length > 0 ? (
          requests?.map((request) => (
            <FriendRequestBox
              key={request.id}
              request={request}
            ></FriendRequestBox>
          ))
        ) : (
          <p>No Friend Requests found</p>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
