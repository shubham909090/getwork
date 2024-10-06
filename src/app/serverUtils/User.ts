"use server"


import { prisma } from "../../../db"

export async function getJobWithCategory(arg:number) {
// if (arg === undefined){
//   return {}
// }
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
      return jobs;
    }

