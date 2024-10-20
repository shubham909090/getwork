'use client'

import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from '@tanstack/react-query'
import { searchJobs } from '@/app/server/serverUtils/jobs'
import { useRouter } from 'next/navigation'
import { useState } from "react";


export default function HomeInput() {
   const router = useRouter()
  const [query, setQuery] = useState('')
  const debouncedSearchTerm = useDebounce(query, 300);


  const { data } = useQuery({
    queryKey: ['fetchjobs',debouncedSearchTerm], // Add selected categories as a part of the query key
    queryFn: () =>query.length>0 ? searchJobs(debouncedSearchTerm) :null,
    refetchOnWindowFocus: false
  });

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)

  }

  const handleSuggestionClick = (id: number) => {
    router.push(`/job/${id}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative py-5 text-black">
      <div className="flex items-center border-2 border-primary rounded-lg overflow-hidden shadow-lg bg-background">
        <Input
          type="text"
          placeholder="Search for microjobs..."
          value={query}
          onChange={handleQueryChange}
          className="flex-grow border-none focus:ring-0 text-lg py-6 px-6 "
        />

      </div>
      {data && (
        <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out opacity-100 scale-100 origin-top ">
          <ScrollArea className="max-h-[300px]">
            <ul className="py-2 ">
              {data.map((job, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-muted cursor-pointer transition-colors duration-150 ease-in-out shadow-sm rounded-xl"
                  onClick={() => handleSuggestionClick(job.id)}
                >
                  {job.title}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}