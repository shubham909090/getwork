"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getJobsByCategoryIds, getAvailableJobs } from '@/app/serverUtils/jobs';
import { selectedCategories } from './categoryselector';
import { Skeleton } from '@/components/ui/skeleton';


type jobs = {
  id: number;
  title: string;
  categories: {
    category: {
      name: string;
      id: number;
    };
  }[];
  description: string;
}[];

export const pageatom = atom({
    key:'pageatom',
    default:1
})


function Jobcards() {
  // Get the selected categories from Recoil
  const selectedcat = useRecoilValue(selectedCategories)
  const [page, setPage] = useRecoilState(pageatom)

  
  // Conditionally set the query function based on selected categories
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['getJobsByCategoryIds', selectedcat,page], // Add selected categories as a part of the query key
    queryFn: () =>selectedcat.length > 0 ? getJobsByCategoryIds(selectedcat,page,10) : getAvailableJobs(page,10),
    enabled: !!selectedcat,// Ensures the query only runs if selectedcat is available
    placeholderData:keepPreviousData,
  });

  const loadMore = () => {
    setPage((prev) => prev + 1); // Increment page to fetch the next set
  };

  const goback = () => {
    setPage((prev) => prev - 1); // Increment page to fetch the next set
  };


  // Loading state
  if (isLoading) {
    return <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>

    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>

    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>

      </div>
    </div>
  </section>
  }

  // Error state
  if (error) {
    return <div>{(error as Error).message}</div>;
  }

  // Render the job cards
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Micro Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                
                <iframe width="full" height="200" className=' rounded-xl' src="https://www.youtube.com/embed/eVli-tstM5E" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>


              </CardHeader>
              <CardContent>
              <CardDescription className=' line-clamp-5'>
                  {job.description}
              </CardDescription>
              </CardContent>
                </div>
              <CardFooter>
                <div className=' flex flex-col gap-4 w-screen'>
                    
                <div className='flex flex-row gap-4'>
                <div className="flex flex-row space-x-2 text-sm text-muted-foreground mt-2">
                  <DollarSign className="h-4 w-4" />
                  <span>$100</span>
                </div>
                <div className="flex flex-row space-x-2 text-sm text-muted-foreground mt-2">
                  <Clock className="h-4 w-4" />
                  <span>1 Hr</span>
                </div>
                <div className="flex flex-row space-x-2 text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>Pune</span>
                </div>
                </div>
                <Button className="w-full">Apply Now</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8 gap-5">
        <Button variant="outline" onClick={goback} disabled={page===1? true:false}>
            Back
        </Button>
        <Button variant='secondary' onClick={loadMore} disabled={isFetching}>
        {isFetching ? 'Loading more...' : 'Load More'}
        </Button>
       
        </div>
      </div>
    </section>
  );
}

export default Jobcards;
