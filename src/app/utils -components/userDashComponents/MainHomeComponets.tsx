"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Clock, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getUsersActiveJob } from '@/app/server/serverUtils/jobs'
import { useQuery } from "@tanstack/react-query"
import { useSession } from 'next-auth/react'

export const MainHomeComponets = () => {
  
  const {data:session,status}=useSession()

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['getUserActiveJob'],
    queryFn: () =>getUsersActiveJob(session?.user?.email),

  });

  return (
    data?.id ? (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Active Job</CardTitle>
            <CardDescription>You can only work on one job at a time</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">{data?.title}</h3>
            <p className="text-muted-foreground mb-4">{data?.shortdescription}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Client: {data?.seller.name}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Price: {data?.price}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Due: {data?.createdAt.getDate()}</span>
              </div>
              <div className="flex items-center">
                <Badge variant={'secondary'}>{data?.applications[0].status}</Badge>
                {data?.categories.map((item) => (
                                <Badge key={item.category.id}>{item.category.name}</Badge>
                            ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="mr-2">Update Progress</Button>
            <Button>Submit Work</Button>
          </CardFooter>
        </Card>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Available Jobs</CardTitle>
            <CardDescription>You currently have no active job. Here are some available opportunities:</CardDescription>
          </CardHeader>

          <CardFooter>
            <a target='_blank' href='/main'><Button variant="outline">View All Jobs</Button></a>
          </CardFooter>
        </Card>
        </div>
      )
  )
}
