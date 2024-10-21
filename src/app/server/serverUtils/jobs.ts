"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../db"
import { JSONContent } from "@tiptap/react";
import { error } from "console";
import { throws } from "assert";


export async function getAvailableJobs(page: number, limit: number) {
  const res = await prisma.job.findMany({
    where: {
      taken: false,
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
      taken: false,
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


type Category = {
  id: number
  name: string
}


type formdata = {
  title: string,
  shortVideoLink: string,
  largeVideoLink: string,
  shortdescription:string,
  description: string,
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
        // @ts-ignore
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
      }, taken:false,
    },
    select: {
      id: true,
      title: true, // Only select the title and id fields
    },
    take: 10, // Limit the results to the first 10
  });

  return jobs
  
}

export const getajob =async(jobId:number)=>{

  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      taken: false,
    },
    include: {
      seller: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      categories: {
        include: {
          category: {
            select: {
              id:true,
              name: true, // Only select the name of the category
            },
          },
        },
      },
    },
  });

  if(job){
    return job
  }else{
    throw new Error("User not found");
  }



}


export async function getRelatedJobs(categoryIds: number[]) {
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
    }, // Skip the previous pages
    take: 10,              // Fetch the specified limit
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
export const fetchAllSellerOpenJobs = async (mail: string) => {
  const res = await prisma.user.findUnique({
    where: { email: mail, role: 'SELLER' },
  });

  if (!res?.id && res?.role !== 'SELLER') {
    return {
      success: false,
      message: "Seller was not found, You are not a Seller or You may not have given your Email",
      jobs: [],
    };
  }

  const jobs = await prisma.job.findMany({
    where: { sellerId: res.id, taken: false },
    select: {
      id: true,
      sellerId: true,
      title: true,
      shorturl:true,
      longurl:true,
      shortdescription: true,
      price: true,
    },
  });

  return {
    success: true,
    jobs: jobs,
  };
};

export const fetchjobDataForEdit=async(jobId:number)=>{
  const job= await prisma.job.findUnique({where:{id:jobId}})

  if(job?.taken===true){
    return {success:false, message: "job is already taken by a user while you were editing, you can't edit it anymore"}
  }
  return {success:true, job}

}
type cleanFormData= {
  description: string;
  shortVideoLink: string;
  largeVideoLink: string;
  shortdescription: string;
}

export const updateJob = async(jobId:number, data:cleanFormData)=>{
 const jobupdate = await prisma.job.update({
  where: {
   id:jobId
  },
  data: {
    description:data.description,
    shortdescription:data.shortdescription,
    shorturl:data.shortVideoLink,
    longurl:data.largeVideoLink
  }
})
 if(jobupdate){
  return{success:true,message:'Listing was updated'}
 }else{
  return{success:false,message:'Some issue while updating Plz contact DEV'}
 }


}

export const fetchAllSellerActiveJobs=async(mail:string)=>{
  const res = await prisma.user.findUnique({
    where: { email: mail, role: 'SELLER' },
  });

  if (!res?.id && res?.role !== 'SELLER') {
    return {
      success: false,
      message: "Seller was not found, You are not a Seller or You may not have given your Email",
      jobs: [],
    };
  }
  
  const jobs = await prisma.job.findMany({
    where: { sellerId: res.id, taken: true },
    select: {
      id: true,
      sellerId: true,
      title: true,
      shortdescription: true,
      price: true,
      acceptedUserId: true,
      categories:{
        select:{
          categoryId:true,
          category:true
        }
      },
      applications: {
        select: {
          id: true,
          status: true,
          appliedAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });


  return {
    success: true,
    jobs: jobs,
  };
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
     await tx.statusHistory.create({
      data: {
        applicationId:newApplication.id,
        changedById:user.id,
        status:'ACCEPTED'
      }
    })

    return {
      success: true,
      message: "You have successfully been assigned to the job",
    };
  });
}


export const getUsersActiveJob=async(mail:string)=>{
  const user = await prisma.user.findUnique({
    where: { email: mail },
    select: { id: true },
  });
  
  const job = await prisma.job.findFirst({
    where: {
      acceptedUserId: user?.id,
      taken: true,
    },
    select: {
      id: true, // jobId
      sellerId: true,
      seller: {
        select: {
          name: true,
        },
      },
      acceptedUserId: true,
      title: true,
      shortdescription: true,
      price: true,
      createdAt: true,
      categories: {
        include: {
          category: true,
        },
      },
      applications: {
        where: {
          userId: user?.id,
        },
        select: {
          status: true,
        },
      },
    },
  });
    
  return job;

  
  }


  export const getPastJobs = async (mail: string) => {
    // Find the user by email to get the user ID
    const user = await prisma.user.findUnique({
      where: { email: mail },
      select: { id: true },
    });
  
    // Find all applications with status 'CLOSED' and include job details
    const pastJobs = await prisma.application.findMany({
      where: {
        userId: user?.id,
        status: 'COMPLETED',
      },
      include: {
        job: {
          select: {
            id: true,
            sellerId: true,
            acceptedUserId: true,
            title: true,
            shortdescription: true,
            price: true,
            createdAt: true,
            // Include seller's name
            seller: {
              select: {
                name: true,
              },
            },
            // Include job categories
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  
    return pastJobs;
  };


export const getAllChatForActiveJobUser =async(userMail:string)=>{

  const user = await prisma.user.findUnique({where:{
    email:userMail
  }})

  if (!user) {
    throw new Error('User not found');
  }

  const job = await prisma.job.findFirst({where:{
    taken:true,
    acceptedUserId:user?.id
  },select:{
    id:true,
    seller:{
      select:{
        name:true
      }
    }
  }})

  if (!job) {
    throw new Error('No ongoing job found for the user');
  }
  
const conversationData = await prisma.application.findFirst({
  where: {
    userId: user?.id,
    jobId: job?.id
  },
  select: {
    id: true,
    status: true, // Include the application status here
    messages: {
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        content: true,
        senderId: true,
        createdAt: true,
        sender: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    },
    statusHistory: {
      orderBy: {
        changedAt: 'asc',
      },
      select: {
        id: true,
        status: true,
        changedAt: true,
        changedById: true,
        changedBy: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    },
  },
});



  const timelineEvents = [
    // Step 1: Map messages to the unified structure
    ...conversationData.messages.map((message) => ({
      id:message.id,
      type: "message",
      timestamp: new Date(message.createdAt),  // Message timestamp
      content: message.content,
      sender: message.sender,
    })),
    
    // Step 2: Map status changes to the unified structure
    ...conversationData.statusHistory.map((statusChange) => ({
      id:statusChange.id,
      type: "statusChange",
      timestamp: new Date(statusChange.changedAt),  // Status change timestamp
      status: statusChange.status,
      sender: statusChange.changedBy,
    })),
  ];

  timelineEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

// Step 4: Now you can return or render the sorted timeline
return {userId:user.id, sellerName:job.seller.name, jobStatus:conversationData?.status,chatContent:timelineEvents, applicationId:conversationData?.id};
  
  
}

export const createEntryForChatOrStatus = async (data: {
  type: "message" | "statusChange";
  content?: string; // Only for messages
  status?: "IN_PROGRESS" | "UNDER_REVIEW" |"PENDING"|"REVISION"|"REJECTED"|"COMPLETED"; // Only for status changes
  sender: string; // Sender's ID
  applicationId: number; // Application's ID
}) => {
  const { type, content, status, sender, applicationId } = data;

  if (type === "message") {
    // Create a message entry
    if (!content) {
      throw new Error("Content is required for a message.");
    }

    const newMessage = await prisma.message.create({
      data: {
        content: content,
        senderId: sender, // Sender's ID
        applicationId: applicationId, // Associated application
      },
    });


  } else if (type === "statusChange") {
    // Create a status change history entry
    if (!status) {
      throw new Error("Status is required for a status change.");
    }

    const newStatusChange = await prisma.statusHistory.create({
      data: {
        status: status,
        changedById: sender, // Sender's ID
        applicationId: applicationId, // Associated application
      },
    });
    const applicationStatusChange = await prisma.application.update({
      where:{
        id:applicationId,
      },data:{
        status:status
      }
    })

  
  } else {
    throw new Error("Invalid type. Must be 'message' or 'statusChange'.");
  }

};



export const getAllChatForActiveJobSeller =async(userMail:string,appid:number)=>{

  const user = await prisma.user.findUnique({where:{
    email:userMail
  }})

  if (!user) {
    throw new Error('User not found ');
  }
  if (user.role==='USER') {
    throw new Error('youre not a seller??? ');
  }
  // const job = await prisma.job.findFirst({where:{
  //   taken:true,
  //   acceptedUserId:user?.id
  // },select:{
  //   id:true,
  //   seller:{
  //     select:{
  //       name:true
  //     }
  //   }
  // }})

  // if (!job) {
  //   throw new Error('No ongoing job found for the user');
  // }
  
const conversationData = await prisma.application.findUnique({
  where: {
    id:appid
  },
  select: {
    id: true,
    status: true, // Include the application status here
    messages: {
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        content: true,
        senderId: true,
        createdAt: true,
        sender: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    },
    statusHistory: {
      orderBy: {
        changedAt: 'asc',
      },
      select: {
        id: true,
        status: true,
        changedAt: true,
        changedById: true,
        changedBy: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    },
  },
});



  const timelineEvents = [
    // Step 1: Map messages to the unified structure
    ...conversationData.messages.map((message) => ({
      id:message.id,
      type: "message",
      timestamp: new Date(message.createdAt),  // Message timestamp
      content: message.content,
      sender: message.sender,
    })),
    
    // Step 2: Map status changes to the unified structure
    ...conversationData.statusHistory.map((statusChange) => ({
      id:statusChange.id,
      type: "statusChange",
      timestamp: new Date(statusChange.changedAt),  // Status change timestamp
      status: statusChange.status,
      sender: statusChange.changedBy,
    })),
  ];

  timelineEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

// Step 4: Now you can return or render the sorted timeline
return {userId:user.id, jobStatus:conversationData?.status,chatContent:timelineEvents};
  
  
}