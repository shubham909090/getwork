import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const Header = () => {
  return (
    <div className="bg-white shadow z-10">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah!</h1>
      <div className="flex items-center">
        <span className="mr-4">Seller Level: Professional</span>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </div>
  )
}

export default Header