"use client";
import axios from 'axios';
import { User } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import Avatar from './sidebar/Avatar';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';

type Props = {
  data:User
  handleModalOpen:(data:User)=>void
}

function UserBox({data,handleModalOpen}: Props) {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false);
  const session = useSession();
  const isCurrentUser = useMemo(()=>{
    if(session.data?.user?.email===data.email){
      return true;
    }
    return false;
  },[session,data]);

  const handleClick = ()=>{
    setIsLoading(true);
    if(isCurrentUser){

      axios.post('/api/conversations',{
        userId: data.id
      }).then((data)=>{
        router.push(`/conversations/${data.data.id}`);
      })
      .catch((error)=>{
        toast.error('Error while fetching data',{
          id:'conversation fetch'
        });
      })
      .finally(()=>setIsLoading(false));
    }
    else{
      handleModalOpen(data);
    }
  }
  const container = clsx('p-2 w-full relative flex items-center bg-white space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer',isCurrentUser?'':'order-1')  
  return (
    <div
      onClick={handleClick}
      
      className={container}
    >
      <Avatar user={data}></Avatar>

      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-xm font-medium text-gray-900'>
              {data.name}
            </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserBox