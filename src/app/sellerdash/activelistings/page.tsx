'use client'

import { fetchAllSellerActiveJobs } from '@/app/server/serverUtils/jobs';
import Popup from '@/app/utils -components/popup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { MessageCircleMore, PlusCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'

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
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <Popup title={popup.title} description={popup.description} visible={popup.visible} set={setPopup}/>
    <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Active Listings</CardTitle>
                <Link href='/sellerdash/createjob'>
                <Button >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Job
                </Button>
                </Link> 
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.jobs?.map((job) => (
                  <div key={job.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-sm text-muted-foreground max-w-lg line-clamp-3">Description: {job.shortdescription}</p>
                    </div>
                    <div className="text-right flex flex-row justify-between gap-5">
                    <div><Button variant={'ghost'} className=' w-fit rounded-lg' onClick={()=>editclick(job.id)}><MessageCircleMore className="w-4 h-4" /></Button></div> 
                     <div> 
                        <p className="font-semibold">Price: {job.price}</p>
                        <p className="text-sm text-muted-foreground">Rating: placeholder</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>) 
}

export default page