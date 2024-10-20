'use server';


import { revalidatePath } from "next/cache";
import { signIn,signOut } from "../../auth";
import { prisma } from "../../db";
import { redirect } from "next/navigation";
import { use } from "react";


export const logIn=async()=>{
 await signIn('google')
 revalidatePath('/')
}

export const SignUp =async()=>{
    await signIn("google",{redirectTo:'/signup/choose'})
}

export const logout =async()=>{
    await signOut({redirect:true})
    
    
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

export async function getRoleByEmail(mail: string) {

    const user = await prisma.user.findUnique({where:{email:mail},select:{role:true}})
    if(user){
      return user.role
    }
  }




