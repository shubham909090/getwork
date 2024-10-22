'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'

const FooterUpperSect = () => {
    const router= useRouter()
  return (
    <section className="py-16 bg-primary text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Have a task? Post it on MicroJobs</h2>
      <p className="text-xl mb-8">Connect with talented freelancers for quick and efficient task completion.</p>
      <Button size="lg" variant="secondary" onClick={()=>router.push('/signup')}>Post a Job</Button>
    </div>
  </section>
  )
}

export default FooterUpperSect