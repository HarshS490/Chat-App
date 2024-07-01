"use client";

import useConversation from '@/app/hooks/useConversation';
import EmptyState from '@/components/EmptyState';
import React from 'react'

type Props = {}

const Home = ()=>{
  const {isOpen} = useConversation();
  return (
    <div className={(isOpen)?'lg:pl-80 h-full lg:block block':'lg:pl-80 h-full lg:block hidden'}>
      <EmptyState></EmptyState>
    </div>
  )
}

const page = (props: Props) => {
  return (
      <Home></Home>
  )
}

export default page