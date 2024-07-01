"use client";
import { FullMessageType } from '@/app/types'
import React from 'react'

type Props = {
  messages:FullMessageType
}

const Body = ({messages}: Props) => {
  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        BOdy
      </div>
    </div>
  )
}

export default Body