'use client'


import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Signin from './signin'
import { useSession } from 'next-auth/react'
import Logout from './Logout'
import { getRoleByEmail } from '@/app/server/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';

enum Role {
  SELLER = "SELLER",
  USER = "USER"
}


const Navigation = () => {
  const router = useRouter()

  const { data: session, status } = useSession()

  const handleClick =async(mail:string)=>{

    const res = await getRoleByEmail(mail)

    if(res ===Role.SELLER){
      router.push('/sellerdash')
    }
    if(res ===Role.USER){
      
      router.push('/userdash')
    }

  }

  if(status==='loading'){
    return<div className="flex flex-col h-fit w-full justify-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  </div>
  }
 
  return (
    <header className="bg-white border-b">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Briefcase className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">MicroJobs</span>
      </Link>
      <nav className="hidden md:flex space-x-4">
        <Link href="/ai-dash" className="text-sm font-medium hover:text-primary">Find Jobs</Link>
        <Link href="#" className="text-sm font-medium hover:text-primary">Post a Job</Link>
        <Link href="#" className="text-sm font-medium hover:text-primary">How It Works</Link>
      </nav>
      {/* @ts-ignore */}
      {session ? <div className=' flex flex-row gap-5'><Logout image={session?.user?.image} name={session.user?.name} /><Button onClick={()=>handleClick(session.user?.email)}>Your Dashboard</Button></div> : <Signin/>}
    </div>
  </header>
  )
}


export default Navigation