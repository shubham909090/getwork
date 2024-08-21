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
import { Badge } from "@/components/ui/badge"


  export  default function JobListings() {


  return (
    <>
            <Card className=" p-5">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                 
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button>Deploy</Button>
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