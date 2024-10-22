import { ActivitySquareIcon, Bell, Briefcase, DollarSign, LogOut, LucideNetwork, MessageCircleIcon, MessageSquare, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {

  return (
    <div className="w-64 bg-white border-r z-10">
        <div className="p-4">
            <Link href='/sellerdash'><h2 className="text-xl font-bold mb-4">Seller Dashboard</h2></Link>
          
          <nav className="space-y-2">
            <Link prefetch={true} href="/sellerdash/createjob" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <Briefcase className="mr-3 h-4 w-4" />
              Create Jobs
            </Link>
            <Link prefetch={true} href="/sellerdash/openlistings" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <MessageSquare className="mr-3 h-4 w-4" />
              Open Listings
            </Link>
            <Link prefetch={true} href="/sellerdash/activelistings" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <DollarSign className="mr-3 h-4 w-4" />
              Active Listings
            </Link>
            <Link  href="/sellerdash/chat" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <MessageCircleIcon className="mr-3 h-4 w-4" />
              Chat
            </Link>
            <Link href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <LucideNetwork className="mr-3 h-4 w-4" />
              TimeLine
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button onClick={()=>signOut({redirectTo:'/'})}  className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Logout
          </button>
        </div>
      </div>
  )
}

export default Sidebar