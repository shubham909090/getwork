"use client"

import { getRelatedJobs } from '@/app/server/serverUtils/jobs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

  
const RelatedJobs = ({cat}:{cat:number[]}) => {
    
const { data} = useQuery({
    queryKey: ['getRelatedJobs'], // Add selected categories as a part of the query key
    queryFn: () => getRelatedJobs(cat),
    placeholderData:keepPreviousData,
  });
  const youtubeUrl = (url: string) => {
    const videoId = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/
    )?.[1];
    return videoId || ''; // Fallback to an empty string
};


  return (
    <Card>
            <CardHeader>
            <CardTitle>Related Jobs</CardTitle>
            </CardHeader>
            <CardContent>
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {data?.map((job) => (
                        <Card key={job.id} className='flex flex-col justify-between'>
                            <div className=' flex flex-col justify-start'>
                            <CardHeader>
                            <CardTitle>{job.title}</CardTitle>
                            <div className="flex justify-start gap-2 py-2">
                            {job.categories.map((item) => (
                                <Badge key={item.category.id}>{item.category.name}</Badge>
                            ))}
                            </div>
                            
                            {job.shorturl ? <iframe width="full" height="200" className=' rounded-xl' src={`https://www.youtube.com/embed/${youtubeUrl(job.shorturl)}?autoplay=0&mute=0&controls=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>: null} 


                        </CardHeader>
                        <CardContent>
                        <CardDescription className=' line-clamp-5'>
                            {job.shortdescription}
                        </CardDescription>
                        </CardContent>
                            </div>
                        <CardFooter>
                            <div className=' flex flex-col gap-4 w-screen'>
                                
                            <div className='flex flex-row gap-4'>
                            <div className="flex flex-row space-x-2 text-sm text-muted-foreground mt-2">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.price}</span>
                            </div>
                            <div className="flex flex-row space-x-2 text-sm text-muted-foreground mt-2">
                            <Clock className="h-4 w-4" />
                            <span>placeholder</span>
                            </div>
                            <div className="flex flex-row space-x-2 text-sm text-muted-foreground mt-2">
                            <MapPin className="h-4 w-4" />
                            <span>placeholder</span>
                            </div>
                            </div>
                            <Link href={`/main/job/${job.id}`}><Button className="w-full">Apply Now</Button></Link>
                            </div>
                        </CardFooter>
                        </Card>
                    ))}
                    </div>
                </div>
    </section>
            </CardContent>
          </Card>
  )
}

export default RelatedJobs