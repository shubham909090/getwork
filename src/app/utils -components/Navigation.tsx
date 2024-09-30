import { Button } from '@/components/ui/button'
import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Navigation() {
  return (
    <header className="bg-white border-b">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Briefcase className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">MicroJobs</span>
      </Link>
      <nav className="hidden md:flex space-x-4">
        <Link href="#" className="text-sm font-medium hover:text-primary">Find Jobs</Link>
        <Link href="#" className="text-sm font-medium hover:text-primary">Post a Job</Link>
        <Link href="#" className="text-sm font-medium hover:text-primary">How It Works</Link>
      </nav>
      <div className="flex space-x-2">
        <Button variant="ghost">Log In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  </header>
  )
}

export default Navigation