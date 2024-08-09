"use server"


import prisma from "../db";



export async function createUser(){

}


export async function getJobWithCategory(arg:number) {

    const jobs = await prisma.job.findMany( {where: {
        categories: {
          some: {
            categoryId: arg,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
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
    // ({
    //     where: {
    //       categories: {
    //         some: {
    //           category: {
    //             name: {
    //               contains: "tech", // Adjust to equals for exact match
    //             },
    //           },
    //         },
    //       },
    //     },
    //     include: {
    //       categories: true, // Include category information for each job
    //     },
    //   });

      return jobs;
    }

