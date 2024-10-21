'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, DollarSign, MessageSquare, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Category {
  id: number
  name: string
}

interface CategoryRelation {
  categoryId: number
  category: Category
}

interface Application {
  id: number
  status: string
  appliedAt: string
  user: {
    id: string
    name: string
  }
}

interface Job {
  id: number
  sellerId: string
  title: string
  shortdescription: string
  price: number
  acceptedUserId: string
  categories: CategoryRelation[]
  applications: Application[]
}

interface JobCardProps {
  job: Job
}

const StatusBadge = ({ status }: { status: string }) => {
  const colorMap = {
    'IN_PROGRESS': 'bg-blue-500',
    'REJECTED': 'bg-red-500',
    'ACCEPTED': 'bg-green-500',
    'PENDING': 'bg-yellow-500',
    'UNDER_REVIEW': 'bg-yellow-500',
    'REVISION': 'bg-blue-500',
    'COMPLETED':'bg-green-700'
  }

  return (
    <Badge className={`${colorMap[status] || 'bg-gray-500'} text-white`}>
      {status.replace('_', ' ')}
    </Badge>
  )
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 overflow-hidden transition-all duration-300 ease-in-out">
      <CardHeader className="cursor-pointer" onClick={toggleExpand}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
          <Button variant="ghost" size="icon">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <CardDescription className={`${isExpanded ? '' : 'line-clamp-4'}`}>
          {job.shortdescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-green-500 mr-1" />
            <span className="font-semibold">${job.price}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.categories.map((cat) => (
              <Badge key={cat.categoryId} variant="secondary">
                {cat.category.name}
              </Badge>
            ))}
          </div>
        </div>
        {isExpanded && (
          <div className="h-fit rounded-md border p-4">
            <h3 className="font-semibold mb-2">Job History</h3>
            {job.applications.map((app) => (
              <Card key={app.id} className="mb-4 p-3">
                <CardContent className="p-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{app.user.name}</span>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Applied: {formatDate(app.appliedAt)}</span>
                  </div>
                  {app.user.id === job.acceptedUserId && (
                    <div className="mb-2 flex items-center text-sm text-green-500">
                      <span>Accepted for this job</span>
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Component() {
    
  return (
    <div className="p-6 bg-muted min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}