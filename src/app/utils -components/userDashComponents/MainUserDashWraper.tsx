"use client"

import UserDashboard from '@/app/userdash/page'
import React from 'react'
import Header from '../sellerDashComponent/header'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SidebarUser from './sidebarUser'
import { MainHomeComponets } from './MainHomeComponets'

const MainUserDashWraper = () => {
  return (
  <MainHomeComponets />

  )
}

export default MainUserDashWraper