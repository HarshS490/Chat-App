import React, { Children, useRef } from 'react'

type Props = {
  children:React.ReactNode;
  isOpen?:boolean;
  handleClose:(e: React.MouseEvent<HTMLElement, MouseEvent>) => void;

}

const Modal = ({children,isOpen,handleClose}: Props) => {
  const containerRef = useRef(null);
  const handleClick = (e:React.MouseEvent<HTMLElement,MouseEvent>)=>{
    console.log(e.target===containerRef.current);
    if(containerRef.current && containerRef.current===e.target){
      handleClose(e);
    }
  }
  return (
    <>
      {isOpen&&
        <div className='fixed w-screen h-screen  bg-gray-500/40 z-30 left-0 top-0' id='modalid'>
        <div className='h-full flex justify-center items-center'  onClick={handleClick} ref={containerRef}>
          {children}
        </div>
      </div>
      }
    </>
  )
}

export default Modal