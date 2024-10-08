"use client"

import React, { SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import Tiptap from '@/app/utils -components/sellerDashComponent/Textediter'
import Popup from '@/app/utils -components/popup'
import { Textarea } from '@/components/ui/textarea'




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

// Mock categories - replace with your actual categories
const CATEGORIES = [
  { id: 1, name: "Digital Marketing" },
  { id: 2, name: "Graphic Design" },
  { id: 3, name: "Video Editing" },
  { id: 4, name: "Web Development" },
  { id: 5, name: "Writing" },
].sort((a, b) => a.name.localeCompare(b.name))


export default function CreateJobForm() {
  const [popup, setPopup]= useState({title:'',description:'',visible:false})



  const [formData, setFormData] = useState<formdata>({
    title: '',
    shortVideoLink: '',
    largeVideoLink: '',
    shortdescription:'',
    description: '',
    categories: [],
    price: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryAdd = (categoryId: string) => {
    const category = CATEGORIES.find(cat => cat.id.toString() === categoryId)
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

  const handleSubmit = () => {
    setPopup({title:'you sureeeee?',description:'broooooooooooooo you sureeeeeeeeeeeeeeeeeeeeeee?',visible:true})
    // Here you would typically send the formData to your backend
    console.log(formData)
    // Add your submission logic here
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
            {/* <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter full job description"
              rows={5}
            /> */}
            <Tiptap />
          </div>

          <div>
            <Label>Categories</Label>
            <Select onValueChange={handleCategoryAdd}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className='overflow-y-scroll max-h-screen'>
                {CATEGORIES.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
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

        <Button className="w-full" onClick={handleSubmit}disabled={!formData.title || !formData.price }>Create Job</Button>
      </div>
    </div>
  )
}