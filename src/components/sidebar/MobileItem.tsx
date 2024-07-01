import Link from 'next/link';
import React from 'react'

type MobileItemProps = {
  label: string;
	icon: any;
	onClick?: () => void;
	active?: boolean;
	href: string;
}

export default function MobileItem({
  label,
	icon: Icon,
	href,
	active,
	onClick,
}: MobileItemProps) {
  const handleClick = ()=>{
    if(onClick){
      return onClick();
    }
  }
  return (
    
    <Link href={href} onClick={handleClick} className='group flex gap-x-3 leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100'>
      {label}
    </Link>
  );
}