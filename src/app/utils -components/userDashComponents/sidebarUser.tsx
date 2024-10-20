import { ActivitySquareIcon, Bell, Briefcase, DollarSign, LogOut, LucideNetwork, MessageCircleIcon, MessageSquare, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {

  return (
    <aside className="w-64 bg-white border-r">
        <div className="p-4">
            <Link href='/userdash'><h2 className="text-xl font-bold mb-4">User Dashboard</h2></Link>
          
          <nav className="space-y-2">
            <Link prefetch={true} href="/userdash/pastjob" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <Briefcase className="mr-3 h-4 w-4" />
              Past Work
            </Link>
            <Link prefetch={true} href="/userdash" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <MessageSquare className="mr-3 h-4 w-4" />
              Yet to be decided
            </Link>
            <Link prefetch={true} href="/userdash/activelistings" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              <DollarSign className="mr-3 h-4 w-4" />
              Active Job
            </Link>
            <Link  href="/userdash/chat" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
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
      </aside>
  )
}

export default Sidebar