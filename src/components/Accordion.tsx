import React, { ReactNode } from 'react'

type Props = {
  children:ReactNode;
  trigger:string;
}

const Accordion = ({children,trigger}: Props) => {
  return (
    <div className='px-5'>
      <span className='block text-xl'>
        {trigger}
      </span>
    </div>
  )
}

export default Accordion