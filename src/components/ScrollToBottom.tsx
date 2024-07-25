"use client";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
  threshold: number | 100;
};

const ScrollToBottom = ({ containerRef, threshold=100 }: Props) => {
  const [showButton,setShowButton] = useState<Boolean>(false);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);

  const handleScroll = ()=>{
    const container = containerRef.current;
    if(!container) return;

    const currentScrollTop = container.scrollTop;
    if(Math.abs(container.scrollHeight-container.scrollTop-container.clientHeight)>1){
      setShowButton(true);
    }
    else{
      setShowButton(false);
    }

    setLastScrollTop(currentScrollTop);
  }

  const scrollToBottom = ()=>{
    const container = containerRef.current;
    if(container){
      container.scrollTo({top:container.scrollHeight,behavior:'smooth'});

    }
  }
  
  
  useEffect(()=>{
    const container = containerRef?.current;
    if(container){
      container.addEventListener('scroll',handleScroll);
    }
    return ()=>{
      container?.removeEventListener('scroll',handleScroll);
    }
  },[containerRef,lastScrollTop])

  return (
    <>
      <button onClick={scrollToBottom} className={!showButton?"hidden fixed right-3 bottom-20":"fixed right-3 bottom-20 rounded-full border border-gray-300 shadow-md shadow-border hover:border-gray-300/75 text-black"}>
        <ChevronDown></ChevronDown>
      </button>
    </>
  )
};

export default ScrollToBottom;
