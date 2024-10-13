'use client'

import { fetchAllSellerOpenJobs, fetchjobDataForEdit, updateJob } from '@/app/server/serverUtils/jobs'
import Popup from '@/app/utils -components/popup'
import Tiptap2 from '@/app/utils -components/sellerDashComponent/Tiptap2'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useQuery } from '@tanstack/react-query'
import { PencilIcon, PlusCircle, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'



type editForm = {
  shortVideoLink: string,
  largeVideoLink: string,
  shortdescription:string,
  description: string,

}
export const editForm = atom<editForm>({
  key:"editForm",
  default:{
    shortVideoLink: '',
    largeVideoLink: '',
    shortdescription:'',
    description: '',
  }
})

 const page = () => {

 const [edit, setEdit]= useState(false)
 const [job, setJob] = useState<number | null>(null);
 const [popup, setPopup]= useState({title:'',description:'',visible:false})

 const [formdata, setFormdata]= useRecoilState(editForm)

 const {data:session, status}=useSession()


 const { data, isLoading, error } = useQuery({
    queryKey: ['fetchAllSellerOpenJobs',edit],
    queryFn: () => fetchAllSellerOpenJobs(session?.user?.email),
  });

  const { data: editData, isLoading: isEditLoading, error: editError } = useQuery({
    queryKey: ['editListing'], // include job as part of the query key
    queryFn: () => fetchjobDataForEdit(job),
    enabled: edit && job !== null, // only run when `edit` is true and `job` has a value
  });

console.log(editData?.job?.description);


  const editclick=async(listingId:number)=>{
    setEdit(true)
    setJob(listingId)

  }
//  if(status ==='loading'){
//     return<div className="flex flex-col h-screen w-full justify-center items-center">
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
//       <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//     </svg>
//   </div>
//  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormdata(prev => ({ ...prev, [name]: value }))
  }
  const handleClose =()=>{
    setEdit(false)
    setJob(null)
    setFormdata({
      shortVideoLink: '',
      largeVideoLink: '',
      shortdescription:'',
      description: '',
    })
  }
  const handleSubmit=async(jobId:number)=>{
    const cleanFormData = {
      shortVideoLink:formdata.shortVideoLink? formdata.shortVideoLink :editData?.job?.shorturl,
      largeVideoLink:formdata.largeVideoLink? formdata.largeVideoLink :editData?.job?.longurl,
      shortdescription:formdata.shortdescription? formdata.shortdescription :editData?.job?.shortdescription,
      description:formdata.description ? formdata.description : editData?.job?.description,
    };
    const res = await updateJob(jobId,cleanFormData)
    if(res.success){
      setPopup({title:`${res.success}`,description:res.message,visible:true})
    }else{
      setPopup({title:`${res.success}`,description:res.message,visible:true})
    }
    setEdit(false)
    setJob(null)
    setFormdata({
      shortVideoLink: '',
      largeVideoLink: '',
      shortdescription:'',
      description: '',
    })
  }

  if(data?.success===false){
    //@ts-ignore
    setPopup({title:"error",description:data.message,visible:true})
  }
if (isLoading){
 return<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
 <Card className="mb-8">
         <CardHeader>
           <div className="flex justify-between items-center">
             <CardTitle>Open Listings</CardTitle>
             <Link href='/sellerdash/createjob'><Button >
                   <PlusCircle className="mr-2 h-4 w-4" />
                   Create New Job
             </Button>
             </Link> 
           </div>
         </CardHeader>
         <CardContent>
           <div className="space-y-4">
               <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                 <div>
                   <Skeleton className=' h-4 w-32 my-1' ></Skeleton>
                   <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                   <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                   <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                 </div>
                 <div className="text-right flex flex-row justify-between gap-5">
                 <div><Skeleton className=' h-4 w-4 rounded-full' ></Skeleton></div> 
                  <div> 
                  <Skeleton className=' h-2 w-20 my-1' ></Skeleton>
                  <Skeleton className=' h-2 w-20 my-1' ></Skeleton>
                 </div>
               </div>
               </div>
           </div>

           <div className="space-y-4">
               <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                 <div>
                   <Skeleton className=' h-4 w-32 my-1' ></Skeleton>
                   <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                   <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                   <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                 </div>
                 <div className="text-right flex flex-row justify-between gap-5">
                 <div><Skeleton className=' h-4 w-4 rounded-full' ></Skeleton></div> 
                  <div> 
                  <Skeleton className=' h-2 w-20 my-1' ></Skeleton>
                  <Skeleton className=' h-2 w-20 my-1' ></Skeleton>
                 </div>
               </div>
               </div>
           </div>


           <div className="space-y-4">
               <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                 <div>
                   <Skeleton className=' h-4 w-32 my-1' ></Skeleton>
                   <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                   <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                   <Skeleton className=' h-2  w-72 my-1' ></Skeleton>
                 </div>
                 <div className="text-right flex flex-row justify-between gap-5">
                 <div><Skeleton className=' h-4 w-4 rounded-full' ></Skeleton></div> 
                  <div> 
                  <Skeleton className=' h-2 w-20 my-1' ></Skeleton>
                  <Skeleton className=' h-2 w-20 my-1' ></Skeleton>
                 </div>
               </div>
               </div>
           </div>
         </CardContent>
       </Card>
       </div>

}
if (isEditLoading){
  return<div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
  <div className=" w-full space-y-8 bg-card p-8 rounded-lg shadow">
  <Skeleton className=' h-6 w-24 my-1' ></Skeleton>
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Skeleton className=' h-8 w-full' ></Skeleton>
      </div>

      <div>
        <Label htmlFor="shortVideoLink">Short Video Link</Label>
        <Skeleton className=' h-8 w-full' ></Skeleton>
      </div>

      <div>
        <Label htmlFor="largeVideoLink">Large Video Link</Label>
        <Skeleton className=' h-8 w-full' ></Skeleton>
      </div>

      <div>
        <Label htmlFor="shortdescription" className='texteditor'>Short Job Description</Label>
        <Skeleton className=' h-8 w-full' ></Skeleton>
      </div>

      <div>
        <Label htmlFor="description" className='texteditor'>Full Job Description</Label>

        <div className="editor flex flex-col justify-between gap-5 border rounded-lg ">
        {/* Toolbar with Button  variant={"secondary"}s */}
        <div className=" flex flex-wrap  py-5 gap-5 justify-center">
        <Skeleton className=' h-20 w-full' ></Skeleton>
        </div>
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Skeleton className=' h-8 w-full' ></Skeleton>
      </div>
    </div>
</div>
</div>
</div>

  
}

  return ( edit ?
          
    (<div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
    <Popup title={popup.title} description={popup.description} visible={popup.visible} set={setPopup}/>
    <div className=" w-full space-y-8 bg-card p-8 rounded-lg shadow">
    <Button onClick={handleClose}><X></X></Button>
      <h1 className="text-3xl font-bold text-center">Editing {editData?.job?.title}</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            value={editData?.job?.title}
            disabled={true}
          />
        </div>

        <div>
          <Label htmlFor="shortVideoLink">Short Video Link</Label>
          <Input
            id="shortVideoLink"
            name="shortVideoLink"
            value={formdata.shortVideoLink}
            onChange={handleInputChange}
            placeholder={editData?.job?.shorturl}
          />
        </div>

        <div>
          <Label htmlFor="largeVideoLink">Large Video Link</Label>
          <Input
            id="largeVideoLink"
            name="largeVideoLink"
            value={formdata.largeVideoLink}
            onChange={handleInputChange}
            placeholder={editData?.job?.longurl}
          />
        </div>

        <div>
          <Label htmlFor="shortdescription" className='texteditor'>Short Job Description</Label>
          <Textarea
            id="shortdescription"
            name="shortdescription"
            value={formdata.shortdescription}
            onChange={handleInputChange}
            placeholder={editData?.job?.shortdescription}
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="description" className='texteditor'>Full Job Description</Label>
          {isEditLoading ? (
          <div>Loading...</div>
        ) : (
        <Tiptap2 key={`${job}-${editData?.job?.description}`} content={editData?.job?.description} />

        )}
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={editData?.job?.price}
            disabled={true}
          />
        </div>
      </div>
      <Button className="w-full" onClick={()=>handleSubmit(editData?.job?.id)} disabled={(formdata.shortdescription || editData?.job?.shortdescription)? false : true }>Update</Button>
    </div>
  </div>)
  :
  (<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <Popup title={popup.title} description={popup.description} visible={popup.visible} set={setPopup}/>
    <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Open Listings</CardTitle>
                <Link href='/sellerdash/createjob'><Button >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Job
                </Button>
                </Link> 
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.jobs?.map((job) => (
                  <div key={job.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-sm text-muted-foreground max-w-lg line-clamp-3">Description: {job.shortdescription}</p>
                    </div>
                    <div className="text-right flex flex-row justify-between gap-5">
                    <div><Button variant={'ghost'} className=' w-fit rounded-lg' onClick={()=>editclick(job.id)}><PencilIcon className="w-4 h-4" /></Button></div> 
                     <div> 
                        <p className="font-semibold">Price: {job.price}</p>
                        <p className="text-sm text-muted-foreground">Rating: placeholder</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>) 
  )


}

export default page


