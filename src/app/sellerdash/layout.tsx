import React from 'react'
import Sidebar from '../utils -components/sellerDashComponent/sidebar'
import Header from '../utils -components/sellerDashComponent/header'



export default function layout({ children }:{ children: React.ReactNode}) {
    return (
  
    <div className="flex h-screen bg-gray-100">
        <Sidebar></Sidebar>
        <main className="flex-1 overflow-y-auto">
        <Header></Header>
        {children}
        </main>
    </div>

  
    );
  }
  