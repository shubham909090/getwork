'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignUp } from "../server/auth"
import { useSession } from "next-auth/react"


export default function Component() {

  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Log in to your account using your Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            className="w-full max-w-sm"
            onClick={async()=>await SignUp()}
            disabled={session ? true : false}
          >
            SignUp with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}