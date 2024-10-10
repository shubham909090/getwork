"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Navigation from "../utils -components/header-footer/Navigation";
import Footer from "../utils -components/header-footer/Footer";
import AuthProvider from "../authprovider";


export default function layout({ children }:{ children: React.ReactNode}) {
  return (
    <>
      <QueryClientProvider client={new QueryClient}>

      {children}

      </QueryClientProvider>
    </>
  );
}
