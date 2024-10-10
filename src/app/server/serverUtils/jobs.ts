"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../../db"
import { NextResponse } from "next/server";
import { JSONContent } from "@tiptap/react";


export async function getAvailableJobs(page: number, limit: number) {
  const res = await prisma.job.findMany({
    where: {
      applications: {
        none: {}, // Exclude jobs that have any applications
      },
    },
    skip: (page - 1) * limit, // Skip the previous pages
    take: limit,              // Fetch the specified limit
    select: {
      id: true,
      title: true,
      shorturl:true,
      shortdescription:true,
      price:true,
      categories: {
        select: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return res;
}

export async function getJobsByCategoryIds(categoryIds: number[], page: number, limit: number) {
  const jobs = await prisma.job.findMany({
    where: {
      categories: {
        some: {
          categoryId: {
            in: categoryIds, // Match any of the specified category IDs
          },
        },
      },
      applications: {
        none: {}, // Exclude jobs with any applications
      },
    },
    skip: (page - 1) * limit, // Skip the previous pages
    take: limit,              // Fetch the specified limit
    select: {
      id: true,
      title: true,
      shorturl:true,
      shortdescription:true,
      price:true,
      categories: {
        select: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return jobs;
}
type TiptapJSON = {
  type: string;
  content?: Array<{ type: string; attrs?: Record<string, unknown>; content?: Array<TiptapJSON> }>
}


type Category = {
  id: number
  name: string
}


type formdata = {
  title: string,
  shortVideoLink: string,
  largeVideoLink: string,
  shortdescription:string,
  description: JSONContent,
  categories: Category[],
  price: string,
}
export const createTheJob =async(formdata:formdata,mail:string)=>{
  const res = await prisma.user.findUnique({where:{
    email:mail
  }})

  if(!res?.id){
    redirect('/')
  }

 if(res.id){
  const newJob = await prisma.job.create({
    data: {
      title: formdata.title,
      shorturl: formdata.shortVideoLink,
      longurl: formdata.largeVideoLink,
      shortdescription: formdata.shortdescription,
      description: formdata.description,
      price: parseFloat(formdata.price),
      taken: false, // Assuming a new job is not taken initially
      seller: {
        connect: { id: res.id },
      },
      categories: {
        create: formdata.categories.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      },
    },
  });

  return true;
 }else{
  return false
 }


}

export const searchJobs = async(query: string)=>{
  const jobs = await prisma.job.findMany({
    where: {
      title: {
        contains: query,
        mode: 'insensitive', // Case insensitive search
      },
    },
    select: {
      id: true,
      title: true, // Only select the title and id fields
    },
    take: 10, // Limit the results to the first 10
  });

  return jobs
  
}