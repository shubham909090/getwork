import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'
import React from 'react'

const Header = () => {
  const {data:session,status}=useSession()

  if(status ==="loading"){
      return<div className="flex flex-col h-fit w-full justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  }

  
  return (status==='authenticated' ?
    <div className="bg-white shadow z-10">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">Welcome back, {session.user?.name}!</h1>
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={session?.user?.image} alt="@shadcn" />
          <AvatarFallback>{session?.user?.name[0].toLocaleUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </div>:<></>
  )
}

export default Header