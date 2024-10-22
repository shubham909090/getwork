'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import { logIn } from '@/app/server/auth'


const Signin = () => {
    const router = useRouter()
  return (
    <div className="flex space-x-2">
    <Button variant='secondary' onClick={()=>router.push('/signup')}>Sign Up</Button>
    <Button variant='default' onClick={async()=> await logIn()}>Log in</Button>
  </div>
  )
}

export default Signin