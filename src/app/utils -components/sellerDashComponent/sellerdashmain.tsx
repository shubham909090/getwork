"use client"


import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Briefcase, MessageSquare, DollarSign, Bell, PlusCircle, Settings, LogOut } from "lucide-react"
const SellerDashMain = () => {

    const [activeListings, setActiveListings] = useState([
        { id: 1, title: "Logo Design", price: "$150", orders: 2, rating: 4.8 },
        { id: 2, title: "Web Development", price: "$500", orders: 1, rating: 5.0 },
        { id: 3, title: "Content Writing", price: "$50", orders: 3, rating: 4.5 },
      ])
    
      const [activeOrders, setActiveOrders] = useState([
        { id: 1, title: "Logo Design for TechStart", client: "John Doe", dueDate: "2024-10-15", status: "In Progress" },
        { id: 2, title: "Website for Local Restaurant", client: "Jane Smith", dueDate: "2024-11-01", status: "Revision" },
      ])
    
      const [earnings, setEarnings] = useState({
        totalEarned: 5000,
        availableForWithdrawal: 3500,
        pendingClearance: 1500,
      })
    
      const [notifications, setNotifications] = useState([
        { id: 1, message: "New order received for Logo Design", time: "2 hours ago" },
        { id: 2, message: "Client left a 5-star review", time: "1 day ago" },
        { id: 3, message: "Payout of $500 processed", time: "3 days ago" },
      ])
    


  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${earnings.totalEarned}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeOrders.length}</div>
                <p className="text-xs text-muted-foreground">
                  2 due this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available for Withdrawal</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${earnings.availableForWithdrawal}</div>
                <p className="text-xs text-muted-foreground">
                  Next payout in 3 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.9</div>
                <p className="text-xs text-muted-foreground">
                  +0.2 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Active Listings */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Active Listings</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
                    <DialogHeader>
                      <DialogTitle>Create New Job</DialogTitle>
                      <DialogDescription>
                        Fill in the details for your new job listing. 
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input id="title" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea id="description" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price
                        </Label>
                        <Input id="price" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Category
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="writing">Writing</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Job</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeListings.map((listing) => (
                  <div key={listing.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{listing.title}</h4>
                      <p className="text-sm text-muted-foreground">Price: {listing.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Orders: {listing.orders}</p>
                      <p className="text-sm text-muted-foreground">Rating: {listing.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Listings</Button>
            </CardFooter>
          </Card>

          {/* Active Orders */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{order.title}</h4>
                      <p className="text-sm text-muted-foreground">Client: {order.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Due: {order.dueDate}</p>
                      <Badge variant={order.status === "In Progress" ? "default" : "secondary"}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Orders</Button>
            </CardFooter>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-4 mb-4">
                    <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p>{notification.message}</p>
                      <p className="text-sm text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Notifications</Button>
            </CardFooter>
          </Card>
        </div>
  )
}

export default SellerDashMain