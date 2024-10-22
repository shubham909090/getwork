'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { atom, useRecoilState } from 'recoil'
import Popup from '../../utils -components/popup'
import { getAllCategories } from '../../server/serverUtils/cat'
import { useQuery } from '@tanstack/react-query'
import Tiptap2 from './Tiptap2'
import { X } from 'lucide-react'
import { signIn, useSession } from "next-auth/react"
import { Progress } from '@/components/ui/progress'




type Category = {
  id: number
  name: string
}


type TiptapJSON = {
  type: string;
  content?: Array<{ type: string; attrs?: Record<string, unknown>; content?: Array<TiptapJSON> }>
}




type signUpState = {
  title: string,
  shortVideoLink: string,
  largeVideoLink: string,
  shortdescription:string,
  description: TiptapJSON,
  categories: Category[],
  price: number,
  isSubmitted:boolean,
  role:string,
  authenticated:boolean
}
export const signUpStateatom = atom<signUpState>({
  key:'signUpStateatom',
  default:{
    title: '',
    shortVideoLink: '',
    largeVideoLink: '',
    shortdescription:'',
    description: {
      type: "doc",
      content: []
    },
    categories: [],
    price: 0,
    isSubmitted: false,
    role:'',
    authenticated:false,
  }
})


export default function Signup() {
  
  const [signupState, setSignupState] = useRecoilState(signUpStateatom)


  const { data: session, status } = useSession();
  if(status==='authenticated'&& session.user){
    setSignupState(prev=>({...prev,authenticated:true}))
  }
  if(status==='loading'){
    return <Progress value={70} />
  }
  if(status==='unauthenticated'){
    setSignupState(prev=>({...prev,authenticated:false}))
  }

  useEffect(() => {
    const savedState = localStorage.getItem("signupState");
    if (savedState) {
      setSignupState(JSON.parse(savedState));
    }
  }, []);


  

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchcategories'],
    queryFn: () => getAllCategories(),
    refetchOnWindowFocus: false
  });

  const [popup, setPopup]= useState({title:'',description:'',visible:false})

  const saveStateToLocalStorage = () => {
    localStorage.setItem("signupState", JSON.stringify(signupState));
  };
  

  const handleRoleChange = (value: string) => {
    setSignupState(prev => ({ ...prev, role: value, isSubmitted: false }))
  }

  const handleSubmit = () => {

    saveStateToLocalStorage();
    setSignupState(prev => ({ ...prev, isSubmitted: true }))

    if(signupState.role==='seller'){
       signIn("google",{redirect:false})
      }else{
       signIn("google",{callbackUrl:'/'})
      }
      
  
  }

  const isSellerButtonDisabled = signupState.role === 'seller' && 
    (!signupState.title || !signupState.shortdescription || !signupState.price)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSignupState(prev => ({ ...prev, [name]: value }))
  }
  
    const handleCategoryAdd = (categoryId: string) => {
      const category = data?.find(cat => cat.id.toString() === categoryId)
      if (category && !signupState.categories.some(cat => cat.id === category.id)) {
        setSignupState(prev => ({
          ...prev,
          categories: [...prev.categories, { id: category.id, name: category.name }]
        }))
      }
    }
  
    const handleCategoryRemove = (categoryId: number) => {
      setSignupState(prev => ({
        ...prev,
        categories: prev.categories.filter(cat => cat.id !== categoryId)
      }))
    }

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 w-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-8 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <RadioGroup onValueChange={handleRoleChange} className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="seller" id="seller" />
                <Label htmlFor="seller">Seller</Label>
              </div>
            </RadioGroup>

            {signupState.role === 'seller' && !signupState.isSubmitted && (
              
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
              value={signupState.title}
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
              value={signupState.shortVideoLink}
              onChange={handleInputChange}
              placeholder="Enter short video link"
            />
          </div>

          <div>
            <Label htmlFor="largeVideoLink">Large Video Link</Label>
            <Input
              id="largeVideoLink"
              name="largeVideoLink"
              value={signupState.largeVideoLink}
              onChange={handleInputChange}
              placeholder="Enter large video link"
            />
          </div>

          <div>
            <Label htmlFor="shortdescription" className='texteditor'>Short Job Description</Label>
            <Textarea
              id="shortdescription"
              name="shortdescription"
              value={signupState.shortdescription}
              onChange={handleInputChange}
              placeholder="Enter full job short description"
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="description" className='texteditor'>Full Job Description</Label>


            <Tiptap2 />

          </div>

          <div>
            <Label>Categories</Label>
            <Select onValueChange={handleCategoryAdd}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
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
              {signupState.categories.map(category => (
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
              value={signupState.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              required={true}
            />
          </div>
        </div>
      </div>
    </div>

    
            )}

            <div>
              <Button
                onClick={handleSubmit}
                disabled={isSellerButtonDisabled}
                variant='default'
                className="w-full"
              >
                {signupState.role === 'seller' && !signupState.isSubmitted ? 'Submit' : 'Sign up with Google'}
              </Button>
            </div>

            {signupState.isSubmitted && (
              <p className="mt-2 text-center text-sm text-gray-600">
                {signupState.role === 'seller' 
                  ? 'Your information has been submitted. Please sign up with Google to continue.'
                  : 'Please complete the Google sign-up process.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>


  )
}