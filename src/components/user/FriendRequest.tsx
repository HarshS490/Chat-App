import getRequests from "@/app/actions/getRequests";

import React, { useEffect, useState } from "react";

import FriendRequestList from "./FriendRequestList";

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
          <FriendRequestList data={requests}></FriendRequestList>
        ) : (
          <p>No Friend Requests found</p>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
