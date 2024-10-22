import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Search, DollarSign, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const categories = [
    "Writing", "Design", "Development", "Marketing", "Virtual Assistant",
    "Customer Service", "Data Entry", "Translation", "Video & Animation"
  ]

  const jobs = [
    { title: "Logo Design", category: "Design", price: "$50", duration: "2 days", location: "Remote" },
    { title: "Blog Post Writing", category: "Writing", price: "$30", duration: "1 day", location: "Remote" },
    { title: "Website Bug Fix", category: "Development", price: "$100", duration: "3 days", location: "Remote" },
    { title: "Social Media Management", category: "Marketing", price: "$200", duration: "1 week", location: "Remote" },
    { title: "Data Entry Specialist", category: "Data Entry", price: "$15/hr", duration: "Ongoing", location: "Remote" },
    { title: "Customer Support Representative", category: "Customer Service", price: "$20/hr", duration: "Part-time", location: "Remote" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
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

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Micro Job</h1>
            <p className="text-xl mb-8">Thousands of small tasks. One big opportunity.</p>
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2 mb-4">
                <Input type="text" placeholder="Search for jobs..." className="bg-white text-black" />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Micro Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <Badge>{job.category}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.price}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                      <Clock className="h-4 w-4" />
                      <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline">View All Jobs</Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Have a task? Post it on MicroJobs</h2>
            <p className="text-xl mb-8">Connect with talented freelancers for quick and efficient task completion.</p>
            <Button size="lg" variant="secondary">Post a Job</Button>
          </div>
        </section>
      </main>

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
            © {new Date().getFullYear()} MicroJobs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}