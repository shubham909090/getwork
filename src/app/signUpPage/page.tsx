'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Component() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companySize: '',
    role: '',
    goals: '',
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
            <>
            <CardHeader>
              <CardTitle>Step 1: Personal Information</CardTitle>
              <CardDescription>Let's start with your basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>
            </CardContent>
          </>
        )
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 2: Company Information</CardTitle>
              <CardDescription>Tell us about your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-size">Company Size</Label>
                <Select onValueChange={(value) => updateFormData('companySize', value)}>
                  <SelectTrigger id="company-size">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input 
                  id="role" 
                  placeholder="e.g. Marketing Manager"
                  value={formData.role}
                  onChange={(e) => updateFormData('role', e.target.value)}
                />
              </div>
            </CardContent>
          </>
        )
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 3: Goals</CardTitle>
              <CardDescription>What do you want to achieve with our product?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={(value) => updateFormData('goals', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="increase-productivity" id="increase-productivity" />
                  <Label htmlFor="increase-productivity">Increase Productivity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="improve-communication" id="improve-communication" />
                  <Label htmlFor="improve-communication">Improve Communication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="streamline-processes" id="streamline-processes" />
                  <Label htmlFor="streamline-processes">Streamline Processes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        )
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Please review your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Company Size:</strong> {formData.companySize}</p>
              <p><strong>Role:</strong> {formData.role}</p>
              <p><strong>Goals:</strong> {formData.goals}</p>
            </CardContent>
          </>
        )
    }
  }

  return (
  
  <div className=' flex flex-col items-center justify-center h-screen'>
    <Card className=" w-fit">
        {renderStep()}
        <CardFooter className="flex justify-between">
            <Button onClick={prevStep} disabled={step === 1}>Previous</Button>
            <Button onClick={nextStep}>
            {step < 4 ? 'Next' : 'Finish'}
            </Button>
        </CardFooter>
        </Card>
  </div>
   
  )
}