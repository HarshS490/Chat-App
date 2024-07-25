import React from 'react'
import { LoaderCircle } from "lucide-react"
type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='w-full h-full flex justify-center z-60 items-center bg-gary-400'>
      <LoaderCircle className='animate-spin'></LoaderCircle>
    </div>
  )
}

export default Loading;