'use client'

import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Store } from "lucide-react"
import { SetRole } from "../../server/auth"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Popup from "../../utils -components/popup"
import { useRouter } from "next/navigation"

export default function Component() {
    const router =useRouter()
    const { data: session, status } = useSession()

    const [popup, setPopup]= useState({title:'',description:'',visible:false})

    const handlesubmit = async(userprf:string,mail:string)=>{
        const flag = await SetRole(userprf,mail)
        if(flag===false){
            setPopup({title:'Not Found',description:'Was not able to find you in our database',visible:true})
            await new Promise(r=>setTimeout(r,3000))
            router.push('/')
        }
    }
    
    if(status==='loading'){
        return<div className="flex flex-col h-screen w-full justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    }
    console.log(session)
  return (

    <div className="container mx-auto px-4 py-8">
    <Popup title={popup.title} description={popup.description} visible={popup.visible} set={setPopup}/>
      <h1 className="text-2xl font-bold text-center mb-6">Choose Your Role</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <button onClick={()=>handlesubmit('SELLER',session?.user?.email)}  className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <Store className="w-16 h-16 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Seller</h2>
              <p className="text-center text-muted-foreground">
                 Offer your skills and services to potential clients
              </p>
            </CardContent>
          </Card>
        </button>
        <button onClick={()=>router.push('/')}  className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <ShoppingCart className="w-16 h-16 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Buyer</h2>
              <p className="text-center text-muted-foreground">
                Find and hire talented freelancers for your projects
              </p>
            </CardContent>
          </Card>
        </button>
      </div>
    </div>

  )
}