"use client";
import { FullRequestType } from '@/app/types'
import React, { useEffect, useMemo, useState } from 'react'
import FriendRequestBox from './FriendRequestBox';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/lib/pusher';
import { FriendRequest } from '@prisma/client';
import { request } from 'http';

type Props = {
  data:FullRequestType[];
}

const FriendRequestList = ({data}: Props) => {
  const [requests,setRequests] = useState(data);
  const session = useSession();
  const pusherChannel = useMemo(()=>session.data?.user?.email,[session.data?.user?.email]) ;

  useEffect(()=>{
    if(!pusherChannel){
      return;
    }
    pusherClient.subscribe(pusherChannel);
    console.log("subscribing to pusher channel");
    const newRequestHandler = (newRequest:FullRequestType)=>{
      console.log("friend Request receieved");
      setRequests((prev)=>{
        const request = prev.filter((request)=>request.id===newRequest.id);
        if(request.length>0){
          return prev;
        }

        return [newRequest,...prev];
      });
    } 

    const declineRequestHandler=(declinedRequest:FullRequestType)=>{
      console.log("declined request");
      setRequests((prev)=>{
        const remainingRequests = prev.filter((request)=>request.id!==declinedRequest.id);
        
        return [...remainingRequests];
      })
    }
    pusherClient.bind("friendRequest",newRequestHandler);
    pusherClient.bind("declineRequest",declineRequestHandler);

    return ()=>{
      pusherClient.unsubscribe(pusherChannel);
      pusherClient.unbind("friendRequest",newRequestHandler);
      pusherClient.unbind("declineRequest",declineRequestHandler);
    }

  },[pusherChannel]);

  return (
    <div>
      {
        requests.map((request) => (
          <FriendRequestBox
            key={request.id}
            request={request}
          ></FriendRequestBox>
        ))
      }
    </div>
  )
}

export default FriendRequestList