"use client"


import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle} from "lucide-react"
import Link from 'next/link'
const SellerDashMain = () => {

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
                  Need to Know from KV What he wants on dash page
            </CardContent>
            <CardFooter>
              <Link href='/sellerdash/openlistings'><Button variant="outline">View All Listings</Button></Link>
            </CardFooter>
          </Card>
        </div>
  )
}

export default SellerDashMain