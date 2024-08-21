"use client"

import { useState } from "react"
import { getJobWithCategory} from "../serverUtils/User"




export default function Signin(){
    const  [name,setName]= useState("")
    const  [email,setEmail]= useState("")
    const  [pass,setPass]= useState("")

    const handleClick = async()=>{

       const res = await getJobWithCategory(1)
        console.log(JSON.stringify(res))
    }

    return<>
    <h3>Name</h3>
        <input type="text" onChange={(e)=>{setName(e.target.value)}}/>
    <h3>Email</h3>
        <input type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
    <h3>Password</h3>
        <input type="text" onChange={(e)=>{setPass(e.target.value)}}/>
    <button onClick={handleClick}>submit</button>
    </>
}