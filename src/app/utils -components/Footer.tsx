import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Have a task? Post it on MicroJobs</h2>
            <p className="text-xl mb-8">Connect with talented freelancers for quick and efficient task completion.</p>
            <Button size="lg" variant="secondary">Post a Job</Button>
          </div>
        </section>
        
    <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">How to Hire</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Talent Marketplace</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Payment Protection</Link></li>
            </ul>
            </div>
            <div>
            <h3 className="font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">How to Find Work</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Direct Contracts</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
            </ul>
            </div>
            <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help & Support</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Success Stories</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
            </div>
            <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Leadership</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
            </ul>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 MicroJobs. All rights reserved.
        </div>
        </div>
    </footer>
    
    </>
    
  )
}

export default Footer