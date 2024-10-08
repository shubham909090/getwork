import { Button } from '@/components/ui/button'
import React from 'react'

import { logout } from '@/app/server/auth'

const Logout = () => {
  return (
    <div className="flex space-x-2">
    <Button variant='default' onClick={async()=>await logout()}>Log Out</Button>
  </div>
  )
}

export default Logout