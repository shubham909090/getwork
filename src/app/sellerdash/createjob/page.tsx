'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import Tiptap from '@/app/utils -components/sellerDashComponent/Textediter'
import Popup from '@/app/utils -components/popup'
import { Textarea } from '@/components/ui/textarea'
import { getAllCategories } from '@/app/server/serverUtils/cat'
import { useQuery } from '@tanstack/react-query'

import { createTheJob } from '@/app/server/serverUtils/jobs'
import { useSession } from 'next-auth/react'
import { atom, useAtom } from 'jotai'



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
  price: number,
}
export const formDatatom = atom<formdata>({
    title: '',
    shortVideoLink: '',
    largeVideoLink: '',
    shortdescription:'',
    description: '',
    categories: [],
    price: 0,
  }
)
// Mock categories - replace with your actual categories


export default function CreateJobForm() {


    
const {data:session,status}=useSession()


  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchcategories'],
    queryFn: () => getAllCategories(),
    refetchOnWindowFocus: false
  });

  const [popup, setPopup]= useState({title:'',description:'',visible:false})



  const [formData, setFormData] = useAtom(formDatatom)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryAdd = (categoryId: string) => {
    const category = data?.find(cat => cat.id.toString() === categoryId)
    if (category && !formData.categories.some(cat => cat.id === category.id)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, { id: category.id, name: category.name }]
      }))
    }
  }

  const handleCategoryRemove = (categoryId: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== categoryId)
    }))
  }

  const handleSubmit = async() => {
    const cleanFormData = {
      ...formData,
      description: formData.description, // convert Tiptap JSON to string
      categories: formData.categories.map(cat => cat.id), // convert categories to array of IDs
    };
  {/* @ts-ignore */}
   const res = await createTheJob(cleanFormData,session?.user?.email)
   if(res){
    setPopup({title:'Done',description:'New job created',visible:true})
    setFormData({
      title: '',
      shortVideoLink: '',
      largeVideoLink: '',
      shortdescription:'',
      description: '',
      categories: [],
      price: 0,
    })
   }else{
    setPopup({title:'Error',description:'Some error while creating a job',visible:true})
   }
    // Add your submission logic here
  }
  if(isLoading){
    return<div className="flex flex-col h-screen w-full justify-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  </div>
  }
  return (
    
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <Popup title={popup.title} description={popup.description} visible={popup.visible} set={setPopup}/>
      <div className=" w-full space-y-8 bg-card p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center">Create a New Job</h1>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter job title"
              required={true}
            />
          </div>

          <div>
            <Label htmlFor="shortVideoLink">Short Video Link</Label>
            <Input
              id="shortVideoLink"
              name="shortVideoLink"
              value={formData.shortVideoLink}
              onChange={handleInputChange}
              placeholder="Enter short video link"
            />
          </div>

          <div>
            <Label htmlFor="largeVideoLink">Large Video Link</Label>
            <Input
              id="largeVideoLink"
              name="largeVideoLink"
              value={formData.largeVideoLink}
              onChange={handleInputChange}
              placeholder="Enter large video link"
            />
          </div>

          <div>
            <Label htmlFor="shortdescription" className='texteditor'>Short Job Description</Label>
            <Textarea
              id="shortdescription"
              name="shortdescription"
              value={formData.shortdescription}
              onChange={handleInputChange}
              placeholder="Enter full job short description"
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="description" className='texteditor'>Full Job Description</Label>
            <Tiptap />
          </div>

          <div>
            <Label>Categories <span className=' text-red-800'>At least 1</span></Label>
            <Select onValueChange={handleCategoryAdd}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category)" />
              </SelectTrigger>
              <SelectContent className='overflow-y-scroll max-h-screen'>
                {isLoading?(<div>Loading...</div>) :(data?.sort((a, b) => a.name.localeCompare(b.name)).map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                )))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.categories.map(category => (
                <Button
                  key={category.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                  onClick={() => handleCategoryRemove(category.id)}
                >
                  {category.name}
                  <X className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              required={true}
            />
          </div>
        </div>

        <Button className="w-full" onClick={handleSubmit}disabled={!formData.title || !formData.price || !formData.shortdescription || formData.categories.length <1}>Create Job</Button>
      </div>
    </div>
  )
}