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

export const checkRoleAndSetJob = async(mail: string, jobId: number)=>{


    return await prisma.$transaction(async (tx) => {
      // Step 1: Check the role of the user
      const user = await tx.user.findUnique({
        where: { email: mail },
        select: { role: true, id:true },
      });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      if (user.role === "SELLER") {
        return {
          success: false,
          message: "Sellers can't take jobs",
        };
      
      }
  
      // Step 2: Check if the user already has a job assigned to them
      const existingAssignedJob = await tx.job.findFirst({
        where: {
          acceptedUserId: user.id,
        },
      });
  
      if (existingAssignedJob) {
        return {
          success: false,
          message: "You already have a job assigned to you",
        };
      }
  
      // Step 3: Check if the job is already taken or has an accepted user
      const job = await tx.job.findUnique({
        where: { id: jobId },
        select: { taken: true, acceptedUserId: true },
      });
  
      if (!job) {
        throw new Error("Job not found");
      }
  
      if (job.taken || job.acceptedUserId) {
        return {
          success: false,
          message: "This job has already been taken by another user",
        };
      }
  
      // Step 4: Create the Application and update the Job
      const newApplication = await tx.application.create({
        data: {
          userId: user.id,
          jobId: jobId,
          status: "ACCEPTED",
        },
      });
  
      await tx.job.update({
        where: { id: jobId },
        data: {
          taken: true,
          acceptedUserId: user.id,
        },
      });
  
      return {
        success: true,
        message: "You have successfully been assigned to the job",
      };
    });
  }

export async function getRoleByEmail(mail: string) {
    const user = await prisma.user.findUnique({where:{email:mail},select:{role:true}})
    if(user){
      return user.role
    }

  }

  // export async function getRoleByEmailButton(mail: string) {
  //   const user = await prisma.user.findUnique({where:{email:mail},select:{role:true}})

      
  //   if(user?.role ==="SELLER"){
  //     redirect('/sellerdash')
  //   }
  //   if(user?.role==='USER'){
      
  //     redirect('/userdash')
  //   }

  //   }

  



