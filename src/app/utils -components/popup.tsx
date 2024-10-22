import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon } from "lucide-react"
{/* @ts-ignore */}
const Popup = (props: { title: string; description: string; visible: boolean, set }) => {
  if (props.visible) {

    const handleClick =()=>{
        props.set({title:'',description:'',visible:false})
    }

    return (
      <div className='fixed top-0 left-0 flex flex-col h-full w-full backdrop-blur-md z-[9999] overflow-auto'>
        <div className='absolute inset-0 flex items-center justify-center'>
          {/* Content centered on the screen */}
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-row items-center gap-2">
                <AlertTriangleIcon className="h-6 w-6 text-yellow-500" />
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{props.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleClick}>OK</Button>
            </CardFooter>
        </Card>

        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Popup;
