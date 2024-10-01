"use server";

import prisma from "../db";


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