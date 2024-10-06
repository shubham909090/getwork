'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Signup = () => {
    const router = useRouter()
  return (
    <div className="flex space-x-2">
    <Button variant='secondary' onClick={()=>router.push('/signUpPage')}>Sign Up</Button>
    <Button variant='default' onClick={()=>signIn("google")}>Log in</Button>
  </div>
  )
}

export default Signup