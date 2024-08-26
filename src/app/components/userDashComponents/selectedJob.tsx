"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


  export  default function SelectedJob() {


  return (
    
            <Card className=" p-5 hidden md:block min-w-full h-fit">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>

                 
                <CardContent />
                <CardFooter className="flex justify-between">
                    <Button>Apply</Button>
                </CardFooter>
                
            </Card>
    
  )
}