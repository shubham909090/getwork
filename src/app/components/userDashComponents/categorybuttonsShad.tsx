"use client"


import {
  Card
} from "@/components/ui/card"


import {
    Calendar
  } from "lucide-react"
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,

  } from "@/components/ui/command"
import React from "react"


export  default function CategoryButtonsShad() {
    // const [open , setOpen] = React.useState(false)

  return (
    <Card className=" p-5">
        <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        {(true && <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>)}
      </Command>
    </Card>
  )
}
