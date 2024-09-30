
import { getAllCategories } from "../serverUtils/cat"
import { getAvailableJobs } from "../serverUtils/jobs"
import React from "react"

import Home from "../utils -components/home-components/home-container"



export default async function LandingPage() {
  
  return (
    <div className="flex flex-col min-h-screen">
    <Home></Home>
    </div>
  )
}