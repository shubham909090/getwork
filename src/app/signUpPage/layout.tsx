'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Children } from "react";
import { RecoilRoot } from "recoil";
import AuthProvider from "../authprovider";



export default function layout({ children }:{ children: React.ReactNode}) {
  return (
    <>
   
<QueryClientProvider client={new QueryClient}>
<RecoilRoot>
      {children}
  </RecoilRoot>
</ QueryClientProvider>
    </>
  );
}
