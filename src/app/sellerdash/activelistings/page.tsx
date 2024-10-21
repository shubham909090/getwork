'use client'

import { fetchAllSellerActiveJobs } from '@/app/server/serverUtils/jobs';
import Popup from '@/app/utils -components/popup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { MessageCircleMore, PlusCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, DollarSign, MessageSquare, Clock } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Category {
  id: number
  name: string
}

interface CategoryRelation {
  categoryId: number
  category: Category
}

interface Application {
  id: number
  status: string
  appliedAt: string
  user: {
    id: string
    name: string
  }
}

interface Job {
  id: number
  sellerId: string
  title: string
  shortdescription: string
  price: number
  acceptedUserId: string
  categories: CategoryRelation[]
  applications: Application[]
}

interface JobCardProps {
  job: Job
}

const StatusBadge = ({ status }: { status: string }) => {
  const colorMap = {
    'IN_PROGRESS': 'bg-blue-500',
    'REJECTED': 'bg-red-500',
    'ACCEPTED': 'bg-green-500',
    'PENDING': 'bg-yellow-500',
    'UNDER_REVIEW': 'bg-yellow-500',
    'REVISION': 'bg-blue-500',
    'COMPLETED':'bg-green-700'
  }

  return (
    <Badge className={`${colorMap[status] || 'bg-gray-500'} text-white`}>
      {status.replace('_', ' ')}
    </Badge>
  )
}


const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 overflow-hidden transition-all duration-300 ease-in-out">
      <CardHeader className="cursor-pointer" onClick={toggleExpand}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
          <Button variant="ghost" size="icon">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <CardDescription className={`${isExpanded ? '' : 'line-clamp-4'}`}>
          {job.shortdescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="font-semibold">${job.price}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.categories.map((cat) => (
              <Badge key={cat.categoryId} variant="secondary">
                {cat.category.name}
              </Badge>
            ))}
          </div>
        </div>
        {isExpanded && (
          <div className="h-fit rounded-md border p-4">
            <h3 className="font-semibold mb-2">Job History</h3>
            {job.applications.map((app) => (
              <Card key={app.id} className="mb-4 p-3">
                <CardContent className="p-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{app.user.name}</span>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Applied: {formatDate(app.appliedAt)}</span>
                  </div>
                  {app.user.id === job.acceptedUserId && (
                    <div className="mb-2 flex items-center text-sm text-green-500">
                      <span>Accepted for this job</span>
                    </div>
                  )}
                  <Link href={`/sellerdash/chat?id=${app.id}`}><Button variant="outline" size="sm" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}



const page = () => {
    const [popup, setPopup]= useState({title:'',description:'',visible:false})
    
    const {data:session, status}=useSession()

    const { data, isLoading, error } = useQuery({
        queryKey: ['fetchAllSellerActiveJobs'],
        queryFn: () => fetchAllSellerActiveJobs(session?.user?.email),
        refetchOnWindowFocus: false
      });


    const editclick =(jobId:number)=>{
        //Open the chat / see the past activitis
    }
    if (isLoading){ 
        return<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card className="mb-8">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Active Listings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <Skeleton className=' h-4 w-32 my-1' ></Skeleton>
                          <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                          <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                          <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                        </div>
                        <div className="text-right flex flex-row justify-between gap-5">
                        <div><Skeleton className=' h-4 w-4 rounded-full' ></Skeleton></div> 
                         <div> 
                         <Skeleton className=' h-2 w-20 my-1' ></Skeleton>
                         <Skeleton className=' h-2 w-20 my-1' ></Skeleton>
                        </div>
                      </div>
                      </div>
                  </div>
                </CardContent>
              </Card>
              </div>
       
       }
    if(data?.success===false){
      setPopup({title:"false",description:data?.message,visible:true})
    }
  return (

    <div className="p-6 bg-muted min-h-screen">
      <Popup title={popup.title} description={popup.description} visible={popup.visible} set={setPopup}/>
      {data?.jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
    ) 
}

export default page