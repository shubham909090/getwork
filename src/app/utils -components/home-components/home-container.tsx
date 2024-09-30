"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import Categoryselector from './categoryselector'
import Jobcards from './jobcards'
import { atom, RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// type categories ={
//     id: number;
//     name: string;
// }[]

// type jobs = {
//     categories: {
//         category: {
//             name: string;
//             id: number;
//         };
//     }[];
//     title: string;
//     id: number;
//     description: string;
// }[]

// export const selectedjobs = atom<jobs
// | undefined>({
//     key:'selectedjobs',
//     default:undefined
// })




const Home = () => {



  return (
    <QueryClientProvider client={new QueryClient}>
    <RecoilRoot>
    <main className="flex-grow ">
    <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Micro Job</h1>
        <p className="text-xl mb-8">Thousands of small tasks. One big opportunity.</p>
        <div className="max-w-3xl mx-auto">



          <div className="flex gap-2 mb-4">
            <Input type="text" placeholder="Search for jobs..." className="bg-white text-black" />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
         
          <Categoryselector/>
          
        </div>
      </div>
    </section>

        <Jobcards />
  </main>
  </RecoilRoot>
  </QueryClientProvider>
  )
}

export default Home