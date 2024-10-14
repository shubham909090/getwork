import { Button } from '@/components/ui/button'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut } from 'next-auth/react'

const Logout = ({image,name}:{image:string,name:string}) => {
  return (
    <div className="flex space-x-2">

    <Avatar>
      <AvatarImage src={image} alt="@shadcn" />
      <AvatarFallback>{name[0].toLocaleUpperCase()}</AvatarFallback>
    </Avatar>
    <Button variant='default' onClick={async()=>await signOut({redirectTo:'/'})}>Log Out</Button>
  </div>
  )
}

export default Logout