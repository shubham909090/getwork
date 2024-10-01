import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, RefreshCw, DollarSign, CheckCircle, AlertCircle } from "lucide-react"

export default function JobApplicationPage({ params }: { params: { slug: string } }) {
  // This data would typically come from your API or database
  const job = {
    id: "1",
    title: "Create a responsive landing page",
    description: "I need a skilled web developer to create a responsive landing page for my new product. The page should be modern, fast, and optimized for all devices. It should include a hero section, features list, pricing table, and contact form.",
    price: 150,
    deliveryTime: 3,
    revisions: 2,
    categories: ["Web Development", "Frontend", "Responsive Design"],
    requirements: [
      "Experience with HTML5, CSS3, and JavaScript",
      "Familiarity with responsive design principles",
      "Portfolio of previous landing page projects",
      "Good communication skills"
    ],
    seller: {
      name: "Alex Johnson",
      avatar: "",
      rating: 4.8,
      jobsCompleted: 127
    },
    relatedJobs: [
      { id: "2", title: "Design a logo for tech startup" },
      { id: "3", title: "Develop a simple React component" },
      { id: "4", title: "Create a mobile-first WordPress theme" }
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.categories.map((category) => (
              <Badge key={category} variant="secondary">{category}</Badge>
            ))}
          </div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{job.description}</p>
            </CardContent>
          </Card>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Related Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.relatedJobs.map((relatedJob) => (
                  <li key={relatedJob.id}>
                    <a href={`/job/${relatedJob.id}`} className="text-blue-600 hover:underline">
                      {relatedJob.title}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 opacity-70" />
                <span className="font-semibold">${job.price}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 opacity-70" />
                <span>{job.deliveryTime} days delivery</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4 opacity-70" />
                <span>{job.revisions} revisions</span>
              </div>
              <Button className="w-full">Apply Now</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>About the Seller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={job.seller.avatar} alt={job.seller.name} />
                  <AvatarFallback>{job.seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{job.seller.name}</p>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Verified Seller</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm">Member since 2021</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm">Last active today</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-semibold">{job.seller.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Jobs Completed</span>
                  <span className="font-semibold">{job.seller.jobsCompleted}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}