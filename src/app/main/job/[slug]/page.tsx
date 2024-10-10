"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock,  DollarSign, CheckCircle} from "lucide-react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getajob } from "@/app/server/serverUtils/jobs"
import RelatedJobs from "@/app/utils -components/jobpage/RelatedJobs"
import TiptapRenderer from "@/app/utils -components/jobpage/tiptaprendrer"

export default function JobApplicationPage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  const youtubeUrl = (url: string) => {
    const videoId = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/
    )?.[1];
    return videoId || ''; // Fallback to an empty string
};


  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['getJobitems'], // Add selected categories as a part of the query key
    queryFn: () => getajob(parseInt(slug)),
    placeholderData:keepPreviousData,
  });

  const getCatArry=()=>{
    const sortedarr:number[]=[]
    data?.categories.forEach(item=>{
      sortedarr.push(item.category.id)
    })
    return sortedarr
  }

  if(error){
    return<div className=" flex flex-col items-center  justify-center h-screen w-full">Somthing went wrong</div>
  }
  if(isLoading){
    return<div className="flex flex-col h-screen w-full justify-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  </div>
  }
  return (

    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {data?.categories.map((category, index) => (
              <Badge key={index} variant="secondary">{category.category.name}</Badge>
            ))}
          </div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{data?.shortdescription}</p>
            </CardContent>
          </Card>
          {data?.longurl && <Card className="mb-6 h-[500px]">

            {data?.longurl ? <iframe className=' rounded-xl w-full h-full' src={`https://www.youtube.com/embed/${youtubeUrl(data.longurl)}?autoplay=0&mute=0&controls=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>: null} 
   
          </Card>}

              {/* @ts-ignore */}
            <TiptapRenderer savedContent={JSON.parse(data?.description)}  />
 


          <RelatedJobs cat={getCatArry()}></RelatedJobs>


        </div>
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 opacity-70" />
                <span className="font-semibold">${data?.price}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 opacity-70" />
                <span> Created At {data?.createdAt.getDay()} {data?.createdAt.getMonth()} {data?.createdAt.getFullYear()}</span>
              </div>
              <Button className="w-full">Apply Now</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>About the Seller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  {/* @ts-ignore */}
                  <AvatarImage src={data?.seller.image} alt={data?.seller.name} />
                  {/* @ts-ignore */}
                  <AvatarFallback>{data?.seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{data?.seller.name}</p>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Verified Seller</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-semibold">placeholder/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Jobs Completed</span>
                  <span className="font-semibold">placeholder</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}