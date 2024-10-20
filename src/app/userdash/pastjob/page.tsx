"use client"


import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { getPastJobs } from '@/app/server/serverUtils/jobs'
import { Badge } from '@/components/ui/badge'

const PastJobs = () => {

  const {data:session,status}=useSession()

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['getPastJobs'],
    queryFn: () =>getPastJobs(session?.user?.email),
    refetchOnWindowFocus: false

  });

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Past Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((job, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold">{job.job.title}</h4>
                <p className="text-muted-foreground mb-4">{job.job.shortdescription}</p>
                <p className="text-sm text-muted-foreground">Client: {job.job.seller.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{job.job.price}</p>
                <p className="text-sm text-muted-foreground">Completed: {job.status}</p>
                
                {/* <div className="flex items-center justify-end mt-1">
                  {[...Array(job.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))} */}
                  <div className="flex items-center">
                    {job.job.categories.map((item) => (
                    <Badge key={item.category.id}>{item.category.name}</Badge>))}
                  </div>
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default PastJobs