"use client";
import { Conversation,User } from '@prisma/client'
import React from 'react'

type Props = {
  data:Conversation&{
    users:User[]
  },
  isOpen:boolean,
  onClose:()=>void
}

const ProfileDrawer = ({isOpen,data,onClose}: Props) => {
  return (
    <div>

    </div>
  )
}

export default ProfileDrawer