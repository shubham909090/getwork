"use client"

import React from 'react'
import Categoryselector from './categoryselector'
import Jobcards from './jobcards'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import HomeInput from './HomeInput'
import { Providers } from '../stateProvider'




const Home = () => {



  return (
    <QueryClientProvider client={new QueryClient}>
    <Providers>
    <main className="flex-grow ">
    <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Micro Job</h1>
        <p className="text-xl mb-8">Thousands of small tasks. One big opportunity.</p>
        <div className="max-w-3xl mx-auto">
          <HomeInput></HomeInput>
          <Categoryselector/>
        </div>
      </div>
    </section>
    <Jobcards />
    </main>
  </Providers>
  </QueryClientProvider>
  )
}

export default Home