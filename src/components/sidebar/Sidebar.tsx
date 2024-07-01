import React from 'react'
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

type Props = {
    children:React.ReactNode;
}

export default async function Sidebar({children}: Props) {
  const currentUser =await getCurrentUser();

  return (
    <div className='h-full'>
        <DesktopSidebar currentUser = {currentUser}></DesktopSidebar>
        <MobileFooter></MobileFooter>
        <main className='lg:pl-20 h-full'>
        {children}
        </main>
    </div>
  )
}