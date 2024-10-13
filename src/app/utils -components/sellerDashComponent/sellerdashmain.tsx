"use client"


import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle} from "lucide-react"
import Link from 'next/link'
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

          {/* Active Listings */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Open Listings</CardTitle>
                <Link href='/sellerdash/createjob'><Button >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Job
                </Button>
                </Link> 
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
              <Link href='/sellerdash/openlistings'><Button variant="outline">View All Listings</Button></Link>
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

        </div>
  )
}

export default SellerDashMain