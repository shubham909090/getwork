"use client"

import * as React from "react"

import { Button } from "@/app/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/card"
import { Badge } from "@/app/ui/badge"
import { SlectedJobDrower } from "./slectedJobDrower"
import { Pin } from "lucide-react"


  export  default function JobListings() {


  return (
    <>
            <Card className=" p-5 min-w-[366px]  mb-5">
                <CardHeader>
                    <div className=" flex justify-between">
                        <CardTitle>Create project</CardTitle>
                        <Pin color="#2e2929" />
                    </div>
                    
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                 
                </CardContent>
                <CardFooter className="flex justify-between">

                <SlectedJobDrower /> {/* for non mobile devices */}

                <Button className=" hidden md:block" variant={"destructive" }>Open</Button>

                    <div className=" flex gap-2">
                        
                        <Badge>Badge</Badge>
                        <Badge>Badge</Badge>
                        <Badge>Badge</Badge>
                    </div>
                </CardFooter>
           
            </Card>





            
            <Card className=" p-5 min-w-[366px]  mb-5">
                <CardHeader>
                    <div className=" flex justify-between">
                        <CardTitle>Create project</CardTitle>
                        <Pin color="#2e2929" />
                    </div>
                    
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                 
                </CardContent>
                <CardFooter className="flex justify-between">

                <SlectedJobDrower /> {/* for non mobile devices */}

                <Button className=" hidden md:block" variant={"destructive" }>Open</Button>

                    <div className=" flex gap-2">
                        
                        <Badge>Badge</Badge>
                        <Badge>Badge</Badge>
                        <Badge>Badge</Badge>
                    </div>
                </CardFooter>
           
            </Card>









            
            <Card className=" p-5 min-w-[366px] mb-5">
                <CardHeader>
                    <div className=" flex justify-between">
                        <CardTitle>Create project</CardTitle>
                        <Pin color="#2e2929" />
                    </div>
                    
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                 
                </CardContent>
                <CardFooter className="flex justify-between">

                <SlectedJobDrower /> {/* for non mobile devices */}

                <Button className=" hidden md:block" variant={"destructive" }>Open</Button>

                    <div className=" flex gap-2">
                        
                        <Badge>Badge</Badge>
                        <Badge>Badge</Badge>
                        <Badge>Badge</Badge>
                    </div>
                </CardFooter>
           
            </Card>
            


    </>
  )
}