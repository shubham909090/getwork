'use client'


import React from 'react'
import Navigation from './Navigation'
import AuthProvider from '@/app/authprovider'


function NavigationWraper() {
  return (
<AuthProvider>
<Navigation></Navigation>
</AuthProvider>
  )
}

export default NavigationWraper