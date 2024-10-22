"use client"

import JobPageWraper from '@/app/utils -components/jobpage/JobPageWraper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { use } from 'react';

export default function Jobpage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const slug = params.slug
  return (
    <QueryClientProvider client={new QueryClient}>
    <JobPageWraper slug={slug} />
    </QueryClientProvider>
  )
}
