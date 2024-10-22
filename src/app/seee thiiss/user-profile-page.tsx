import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MapPin, Star, CheckCircle } from "lucide-react"

export default function UserProfilePage() {
  // This data would typically come from your API or database
  const user = {
    id: "1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=128&width=128",
    location: "New York, USA",
    memberSince: "2021-05-15",
    bio: "Passionate web developer with 5+ years of experience. Specialized in creating responsive and user-friendly websites and applications.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "UI/UX Design"],
    services: [
      { id: "1", title: "Responsive Website Development", price: 500 },
      { id: "2", title: "Custom React Component Creation", price: 150 },
      { id: "3", title: "Website Performance Optimization", price: 300 },
    ],
    reviews: [
      { id: "1", rating: 5, comment: "Excellent work! Delivered on time and exceeded expectations.", author: "Jane Doe" },
      { id: "2", rating: 4, comment: "Great communication and quality work. Would hire again.", author: "John Smith" },
      { id: "3", rating: 5, comment: "Alex is a true professional. Highly recommended!", author: "Emily Brown" },
    ],
    completedJobs: 127,
    rating: 4.8,
  }

  const calculateAverageRating = (reviews) => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    return (total / reviews.length).toFixed(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="mr-1 h-4 w-4" />
                    {user.location}
                  </CardDescription>
                  <CardDescription className="flex items-center mt-1">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    Member since {new Date(user.memberSince).getFullYear()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">About Me</h3>
              <p>{user.bio}</p>
              <h3 className="font-semibold mt-4 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {user.services.map((service) => (
                  <li key={service.id} className="flex justify-between items-center">
                    <span>{service.title}</span>
                    <span className="font-semibold">${service.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {user.reviews.map((review) => (
                <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="font-semibold">{review.author}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Seller Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Completed Jobs</span>
                <span className="font-semibold">{user.completedJobs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Rating</span>
                <span className="font-semibold">{user.rating} / 5</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-6 w-6 ${i < Math.round(user.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Based on {user.reviews.length} reviews
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Button className="w-full mb-4">Contact {user.name}</Button>
              <Button variant="outline" className="w-full">View All Services</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}