
import getConversations from '@/app/actions/getConversations'
import ConversationList from '@/components/conversation/ConversationList'
import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'

type Props = {
  children:React.ReactNode
}

const layout =async ({children}: Props) => {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations}/>
        {children}
      </div>
    </Sidebar>
  )
}

export default layout