"use client";
import { FullMessageType } from '@/app/types'
import React from 'react'
import MessageBox from './MessageBox';

type Props = {
  messages:FullMessageType[]
}

const Body = ({messages}: Props) => {
  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        {
          messages.map((message,i)=>(
            <MessageBox key={message.id} isLast={i===messages.length-1} data={message}>

            </MessageBox>
          ))
        }
      </div>
    </div>
  )
}

export default Body