import React, { Children, useRef } from "react";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  handleClose: () => void;
};

const Modal = ({ children, isOpen, handleClose }: Props) => {
  const containerRef = useRef(null);
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    console.log(e.target === containerRef.current);
    if (containerRef.current && containerRef.current === e.target) {
      handleClose();
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed w-screen h-screen  bg-black/50 z-30 left-0 top-0"
          id="modalid"
        >
          <div
            className="h-full w-full flex flex-col items-center justify-center"
            onClick={handleClick}
            ref={containerRef}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
