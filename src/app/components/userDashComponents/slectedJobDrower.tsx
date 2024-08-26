"use client"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SlectedJobDrower() {
 

  return (<div className=" md:hidden">
                <Drawer>
                        <DrawerTrigger className=" bg-black text-white px-5 py-2 rounded-lg">Open</DrawerTrigger>
                        <DrawerContent>


                        <Card className=" p-5 ">
                                <CardHeader>
                                    <CardTitle>Create project</CardTitle>
                                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button>Apply</Button>
                                </CardFooter>
                                <CardHeader>
                                    <CardTitle>Create project</CardTitle>
                                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                                </CardHeader>
                                <CardContent>

                                
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button>Apply</Button>
                                </CardFooter>
                            </Card>


                            {/* <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>This action cannot be undone.</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            </DrawerFooter> */}
                            <DrawerFooter>
                                <DrawerClose>Close</DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                        </Drawer>


  </div>
        
  )
}
