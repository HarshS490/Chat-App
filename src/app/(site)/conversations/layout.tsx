
import getConversations from '@/app/actions/getConversations'
import getUsers from '@/app/actions/getUsers'
import ConversationList from '@/components/conversation/ConversationList'
import Sidebar from '@/components/sidebar/Sidebar'
import React, { Suspense } from 'react'
import Loading from "./Loading"
type Props = {
  children:React.ReactNode
}

const layout =async ({children}: Props) => {
  const conversations = await getConversations();
  const users  = await getUsers();
  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} users={users}/>
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
      </div>
    </Sidebar>
  )
}

export default layout