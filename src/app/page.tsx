"use client";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const inter = Inter({subsets:['latin']})

export default function Home() {
  const router = useRouter();
  useEffect(()=>router.push('/auth'),[router]);
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        
      </div>
    </>
  );
}
