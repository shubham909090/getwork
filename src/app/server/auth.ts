'use server';

import { signIn,signOut } from "../../../auth";
import { prisma } from "../../../db";
import { redirect } from "next/navigation";

export const logIn=async()=>{
 await signIn('google')
}

export const SignUp =async()=>{
    await signIn("google",{redirectTo:'/choose'})
}

export const logout =async()=>{
    await signOut({redirectTo:'/'})
    
}

export const SetRole =async(userpref:string,mail:string)=>{
    const res = await prisma.user.findUnique({
        where:{email:mail}
    })
    console.log(res)
    if(res?.id){
        if(userpref==='SELLER'){
        const updateUser = await prisma.user.update({
            where: {
              id:res.id
            },
            data: {
              role:'SELLER'
            }
          })
          console.log('i was here',updateUser)
          redirect('/')
        }
    }
    return false
    
}