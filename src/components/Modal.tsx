import React, { Children } from 'react'

type Props = {
  children:React.ReactNode
}

const Modal = ({children}: Props) => {
  return (
    <div className='fixed w-screen h-screen bg-gray-500/40 z-50'>
      <div className='h-full flex justify-center items-center'>
        {children}
      </div>
    </div>
  )
}

export default Modal