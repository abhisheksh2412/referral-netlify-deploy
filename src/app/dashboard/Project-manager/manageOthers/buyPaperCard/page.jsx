"use client"

import DashboardFooter from '@/components/dashboard/dashboardfooter/page'
import Container from '@/components/globals/container'
import TopHeader from '@/components/home/homeHeader/topheader'
import InnerBanner from '@/components/innerpagebanner/page'
import BuyPlasticCardForm from '@/components/managerdashboard/addPlasticard/buyPlasticcardform'
import ManagerDashboardHeader from '@/components/managerdashboard/header/managerheader'
import { useRouter } from 'next/navigation'
import React from 'react'


function BuyPaperCard() {
    const router=useRouter()
  return (
    <div>
         <TopHeader />
            <ManagerDashboardHeader />
            <InnerBanner title={"Buy paper Card"} />
            <div className='p-16'>
                   <Container>
                     <div className='p-12 new-shadow  bg-white w-3/5 mx-auto rounded-lg'>
                        <h3 class="text-left text-2xl leading-tight mb-6 font-semibold text-black">Add Plastic Card </h3>
                          
                        <BuyPlasticCardForm/>

                     </div>
                  </Container>
                  </div>
            <DashboardFooter />       
    </div>
  )
}

export default BuyPaperCard
