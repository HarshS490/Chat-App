import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({subsets:['latin']})

export default function Home() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        ChatApp
      </div>
    </>
  );
}
