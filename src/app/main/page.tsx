"use client" 
import { RecoilRoot } from "recoil";
import { CategoryButtons } from "../components/categoryButtons";
import JobCards from "../components/jobCards"
import React from "react";


export default function UserDash() {
  
  return (
    <><RecoilRoot>
       <React.Suspense fallback={<div>Loading...</div>}>
       <CategoryButtons />
      </React.Suspense>
      <React.Suspense fallback={<div>Loading...</div>}>
        
      <JobCards />
      </React.Suspense>
      </RecoilRoot>
    </>
  )
}

