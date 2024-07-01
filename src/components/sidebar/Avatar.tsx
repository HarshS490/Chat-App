'use client';
import { User } from '@prisma/client'
import React from 'react'
import Image from 'next/image';
type Props = {
  user:User
}

const Avatar = ({user}: Props) => {
  return (
    <div className='relative'>
      <div className='relative inline-block rounded-full overflow-hidden h-8 w-8 md:h-9 md:w-9'>
        <Image src={user?.image||'/userplaceholder.jpg'} alt='Avatar' width={40} height={40} className='w-auto h-auto'/>
      </div>
        {/* <span className='absolute block rounded-full bg-green-500 ring-2 top-0 right-0  h-2 w-2 md:w-3 md:h-3'></span> */}
    </div>
  )
}

export default Avatar;