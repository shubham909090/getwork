"use client"

import JobPageWraper from '@/app/utils -components/jobpage/JobPageWraper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function Jobpage  ({ params }: { params: { slug: string } })  {
  const slug = params.slug
  return (
    <QueryClientProvider client={new QueryClient}>
    <JobPageWraper slug={slug} />
    </QueryClientProvider>
  )
}
