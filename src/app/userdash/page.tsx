"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Briefcase, MessageSquare, Clock, DollarSign, Star, ChevronRight } from "lucide-react"

export default function UserDashboard() {
  const [hasActiveJob, setHasActiveJob] = useState(true)
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Job Seller', message: 'Hi there! How\'s the progress on the logo design?' },
    { sender: 'You', message: 'Hello! It\'s going well. I\'ve completed the initial sketches.' },
    { sender: 'Job Seller', message: 'Great! Can\'t wait to see them. When do you think you\'ll have the first draft ready?' },
  ])

  const activeJob = {
    title: "Logo Design for Tech Startup",
    client: "TechNova Inc.",
    price: "$150",
    dueDate: "2024-10-01",
    status: "In Progress",
    description: "Create a modern and innovative logo for a cutting-edge tech startup. The logo should convey ideas of growth, innovation, and reliability."
  }

  const pastJobs = [
    { title: "Website Copy Writing", client: "GreenEarth NGO", price: "$100", completedDate: "2024-09-15", rating: 5 },
    { title: "Social Media Graphics", client: "FitLife Gym", price: "$80", completedDate: "2024-09-10", rating: 4 },
    { title: "Product Description Writing", client: "Gadget World", price: "$60", completedDate: "2024-09-05", rating: 5 },
  ]

  const availableJobs = [
    { title: "Virtual Assistant Needed", price: "$20/hr", duration: "Ongoing" },
    { title: "Podcast Editor", price: "$50/episode", duration: "Weekly" },
    { title: "Data Entry Specialist", price: "$15/hr", duration: "2 weeks" },
  ]

  const sendMessage = (message: string) => {
    setChatMessages([...chatMessages, { sender: 'You', message }])
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Home</a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Jobs</a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Messages</a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Profile</a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Settings</a>
          </nav>
        </div>
        <div className="p-4 border-t">
          <h3 className="font-semibold mb-2">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Completed Jobs</span>
              <span className="font-bold">23</span>
            </div>
            <div className="flex justify-between">
              <span>Earned This Month</span>
              <span className="font-bold">$1,250</span>
            </div>
            <div className="flex justify-between">
              <span>Average Rating</span>
              <span className="font-bold">4.8/5</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <div className="flex items-center">
              <span className="mr-4">Balance: $500</span>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Active Job Section */}
          {hasActiveJob ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Current Active Job</CardTitle>
                <CardDescription>You can only work on one job at a time</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">{activeJob.title}</h3>
                <p className="text-muted-foreground mb-4">{activeJob.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Client: {activeJob.client}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Price: {activeJob.price}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Due: {activeJob.dueDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline">{activeJob.status}</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">Update Progress</Button>
                <Button>Submit Work</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Available Jobs</CardTitle>
                <CardDescription>You currently have no active job. Here are some available opportunities:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableJobs.map((job, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.duration}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold mr-4">{job.price}</span>
                        <Button size="sm">Apply</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View All Jobs</Button>
              </CardFooter>
            </Card>
          )}

          {/* Past Jobs Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Past Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastJobs.map((job, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{job.price}</p>
                      <p className="text-sm text-muted-foreground">Completed: {job.completedDate}</p>
                      <div className="flex items-center justify-end mt-1">
                        {[...Array(job.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Past Jobs</Button>
            </CardFooter>
          </Card>

          {/* Chat Section */}
          <Card>
            <CardHeader>
              <CardTitle>Chat with Job Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="messages" className="w-full">
                <TabsList>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                </TabsList>
                <TabsContent value="messages">
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p className="text-sm font-semibold mb-1">{msg.sender}</p>
                          <p>{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex mt-4">
                    <Input placeholder="Type your message..." className="flex-grow mr-2" />
                    <Button onClick={() => sendMessage("Thanks for the update. I'll send the sketches soon.")}>Send</Button>
                  </div>
                </TabsContent>
                <TabsContent value="files">
                  <p>No files shared yet.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}