import { User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'
type Props = {
  items:User[]
}

const UsersList = ({items}: Props) => {
  return (
    <aside className='fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border0gray-200 block w-full left-0'>
      <div className='px-5'>
        <div className='flex-col'>
          <div className='text-2xl font-bol text-neutral-800 py-4'>
            People
          </div>
        </div>
        {items.map((item)=>(
          <UserBox key={item.id} data={item}></UserBox>
        ))}
      </div>
    </aside>
  )
}

export default UsersList