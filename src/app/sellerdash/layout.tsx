'use client'

import React from 'react'
import Sidebar from '../utils -components/sellerDashComponent/sidebar'
import Header from '../utils -components/sellerDashComponent/header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';




export default function layout({ children }:{ children: React.ReactNode}) {

    return (

    <div className="flex h-screen bg-gray-100">
        
        <Sidebar></Sidebar>
        <QueryClientProvider client={new QueryClient}>
        <RecoilRoot>
        <main className="flex-1 overflow-y-auto">
        <Header></Header>
        {children}
        </main>
        </RecoilRoot>
        </QueryClientProvider>
    </div>

  
    );
  }
  