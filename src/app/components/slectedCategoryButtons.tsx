"use client"

import {
    Card
  } from "@/components/ui/card"
import CategoryButtons from "../components/categorybuttonsShad"
import { Button } from "@/components/ui/button"
import {  X } from "lucide-react"

  

  export  default function SlectedCategoryButtons() {


  return (
    <>
            <Card className=" p-5">
            <Button className="" variant="ghost" >Selected category name<X /></Button>
            <Button className="" variant="ghost" >Selected category name<X /></Button>
            <Button className="" variant="ghost" >Selected category name<X /></Button>
            </Card>
    </>
  )
}
