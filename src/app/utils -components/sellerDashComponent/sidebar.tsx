import { Bell, Briefcase, DollarSign, LogOut, MessageSquare, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {

  return (
    <div className="w-64 bg-white border-r z-10">
        <div className="p-4">
            <Link href='/sellerdash'><h2 className="text-xl font-bold mb-4">Seller Dashboard</h2></Link>
          
          <nav className="space-y-2">
            <Link href="/sellerdash/createjob" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <Briefcase className="mr-3 h-4 w-4" />
              Create Jobs
            </Link>
            <Link href="/sellerdash/openlistings" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <MessageSquare className="mr-3 h-4 w-4" />
              Open Listings
            </Link>
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <DollarSign className="mr-3 h-4 w-4" />
              Earnings
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <Bell className="mr-3 h-4 w-4" />
              Notifications
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </a>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            <LogOut onClick={()=>signOut({redirectTo:'/'})} className="mr-3 h-4 w-4" />
            Logout
          </a>
        </div>
      </div>
  )
}

export default Sidebar