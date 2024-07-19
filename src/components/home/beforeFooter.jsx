import React from 'react'
import Container from '../globals/container'
import Link from 'next/link'

function BeforeFooter() {
  return (
    <div className='p-6 md:p-8 lg:p-14 bg-white'>
     <Container>
                <div className="md:flex lg:flex items-center p-6 md:p-6 lg:p-10 rounded-lg bg-[#f4739e] bg-[url('/assets/bg-1.png')] bg-no-repeat; bg-cover">
                      <div className='md:w-4/5	lg:w-4/5'>
                        <h2 className='mb-2 text-2xl md:text-2xl lg:text-3xl font-semibold text-white text-center md:text-left lg:text-left'>Log in and activate your coupons</h2>
                        <p className='text-left text-white text-center md:text-left lg:text-left'>This is the fastest way to collect °points.</p>
                      </div>
                      <div className='md:w-1/5 lg:w-1/5 mt-5 md:mt-0 lg:mt-0'>
                        <Link href="#" className='bg-[#0e0a38] inline-block flex items-center justify-center gap-2 py-4 rounded-md text-white px-2 w-40	 md:w-full lg:w-full mx-auto'>
                           Login Now
                        </Link>
                      </div>
                </div>
     </Container>
    </div>
  )
}

export default BeforeFooter
