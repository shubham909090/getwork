"use client"

import React, { Children } from "react";
import SidebarUser from "../utils -components/userDashComponents/sidebarUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../utils -components/sellerDashComponent/header";



export default function layout({ children }:{ children: React.ReactNode}) {
  return (
    <>
    <div className="flex h-screen bg-gray-100">
      <SidebarUser  />
    <QueryClientProvider client={new QueryClient}>
          <main className="flex-1 overflomainw-y-auto">
                  <Header></Header>
                  {children}
          </main>
      </QueryClientProvider></div>

    </>
  );
}
