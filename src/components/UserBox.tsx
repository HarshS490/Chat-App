"use client";
import axios from 'axios';
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import Avatar from './sidebar/Avatar';

type Props = {
  data:User
}

function UserBox({data}: Props) {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false);

  const handleClick = ()=>{
    setIsLoading(true);
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
  return (
    <div
      onClick={handleClick}
      className='p-2 w-full relative flex items-center bg-white space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
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