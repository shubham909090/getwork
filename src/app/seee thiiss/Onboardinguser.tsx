'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Upload } from 'lucide-react'

export default function OnboardingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    position: '',
    birthday: '',
    panFront: null,
    panBack: null,
    adhaarFront: null,
    adhaarBack: null,
    introduction: '',
    quirk: '',
    hobbies: '',
    favoriteFood: '',
    persona: '',
    favoriteBook: '',
    systemSpecs: '',
    learningGoal: '',
    fiveYearSkill: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    bankDetails: '',
    startTime: '',
    lunchBreak: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleFileUpload = (e) => {
    const { name, files } = e.target
    setFormData(prevData => ({ ...prevData, [name]: files[0] }))
  }

  const handleNext = () => setStep(prevStep => prevStep + 1)
  const handlePrev = () => setStep(prevStep => prevStep - 1)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log(formData)
    alert('Form submitted successfully!')
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Micro Job Onboarding</CardTitle>
          <CardDescription>Please fill out the following information to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="position">Position at Maitreya Labs *</Label>
                  <Select name="position" onValueChange={(value) => handleInputChange({ target: { name: 'position', value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital-marketing">Digital Marketing Project Manager</SelectItem>
                      <SelectItem value="video-editor">Video Editor</SelectItem>
                      <SelectItem value="ui-ux">UI / UX Designer</SelectItem>
                      <SelectItem value="web-developer">Website Developer</SelectItem>
                      <SelectItem value="copywriter">Copywriter</SelectItem>
                      <SelectItem value="telecalling">Telecalling</SelectItem>
                      <SelectItem value="ai-consultant">AI Consultant</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="birthday">When is your birthday? *</Label>
                  <Input id="birthday" name="birthday" type="date" value={formData.birthday} onChange={handleInputChange} required />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="panFront">PAN Front *</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="panFront" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <Input id="panFront" name="panFront" type="file" className="sr-only" onChange={handleFileUpload} required />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="panBack">PAN Back *</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="panBack" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <Input id="panBack" name="panBack" type="file" className="sr-only" onChange={handleFileUpload} required />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="adhaarFront">Adhaar Front *</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="adhaarFront" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <Input id="adhaarFront" name="adhaarFront" type="file" className="sr-only" onChange={handleFileUpload} required />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="adhaarBack">Adhaar Back *</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="adhaarBack" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <Input id="adhaarBack" name="adhaarBack" type="file" className="sr-only" onChange={handleFileUpload} required />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="introduction">Introduction</Label>
                  <Textarea id="introduction" name="introduction" value={formData.introduction} onChange={handleInputChange} placeholder="Please introduce yourself to your team members in a brief manner." />
                </div>
                <div>
                  <Label htmlFor="quirk">A little known detail or quirk about you</Label>
                  <Textarea id="quirk" name="quirk" value={formData.quirk} onChange={handleInputChange} placeholder="Share something unique about yourself." />
                </div>
                <div>
                  <Label htmlFor="hobbies">What are your hobbies?</Label>
                  <Textarea id="hobbies" name="hobbies" value={formData.hobbies} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="favoriteFood">Favorite food? What's special about it?</Label>
                  <Textarea id="favoriteFood" name="favoriteFood" value={formData.favoriteFood} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="persona">Please describe your persona in one adjective.</Label>
                  <Input id="persona" name="persona" value={formData.persona} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="favoriteBook">What's your favorite book or a movie? And Why?</Label>
                  <Textarea id="favoriteBook" name="favoriteBook" value={formData.favoriteBook} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="systemSpecs">What are the specs of your system (Laptop and Smartphone) and why you have chosen these specs?</Label>
                  <Textarea id="systemSpecs" name="systemSpecs" value={formData.systemSpecs} onChange={handleInputChange} />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="learningGoal">What is the one thing you are looking to learn at Maitreya Labs? *</Label>
                  <Textarea id="learningGoal" name="learningGoal" value={formData.learningGoal} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="fiveYearSkill">What is the specific skillset you want to be known for after five years from now? *</Label>
                  <Textarea id="fiveYearSkill" name="fiveYearSkill" value={formData.fiveYearSkill} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label>Let's connect.</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input id="facebook" name="facebook" value={formData.facebook} onChange={handleInputChange} placeholder="Facebook" />
                    <Input id="instagram" name="instagram" value={formData.instagram} onChange={handleInputChange} placeholder="Instagram" />
                    <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="LinkedIn" />
                    <Input id="twitter" name="twitter" value={formData.twitter} onChange={handleInputChange} placeholder="Twitter" />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bankDetails">Bank information for the stipend / salary *</Label>
                  <Textarea 
                    id="bankDetails" 
                    name="bankDetails" 
                    value={formData.bankDetails} 
                    onChange={handleInputChange} 
                    placeholder="Bank Acc. Holder's Name:
                        Bank IFSC Code:
                        Bank Acc. Number:
                        SWIFT code:
                        MICR Code:
                        Account Type (Savings/Current):"
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">At what time would you like to start the day? *</Label>
                  <Input id="startTime" name="startTime" type="time" value={formData.startTime} onChange={handleInputChange} required />
                  <p className="text-sm text-gray-500 mt-1">An ordinary office day consists of 9 hrs of office work.</p>
                  <p className="text-sm text-gray-500">We are flexible with schedules. You can work according to your time table. Please reciprocate this flexibility with superb accountability and response-ability.</p>
                </div>
                <div>
                  <Label htmlFor="lunchBreak">Please select your preference of lunch break. *</Label>
                  <RadioGroup name="lunchBreak" value={formData.lunchBreak} onValueChange={(value) => 
                    handleInputChange({ target: { name: 'lunchBreak', value } })
                  }>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30min" id="r1" />
                      <Label htmlFor="r1">30 minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="45min" id="r2" />
                      <Label htmlFor="r2">45 minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="60min" id="r3" />
                      <Label htmlFor="r3">60 minutes</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button onClick={handlePrev} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          {step < 5 ? (
            <Button onClick={handleNext} className="ml-auto">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto">
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}