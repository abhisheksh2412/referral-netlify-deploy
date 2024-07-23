import Link from 'next/link'
import React from 'react'
import SocialMedia from './homeHeader/socialMedia'
import Image from 'next/image'

function Footer() {
  return (
    <div className='bg-[#0e0a38] pt-10'>
      <div className='text-center'>
      
        <Image
          src='/assets/footer-logo.png'
          width={500}
          height={500}
          alt="Picture of the author"
          className='!w-40 m-auto'
        />

        <div className='flex justify-center gap-2 md:gap-5 lg:gap-5 my-6 md:my-14 lg:my-14'>
          <Link className='text-white' href="#">Home</Link>
          <Link className='text-white' href="#">Login</Link>
          <Link className='text-white' href="#">Signup</Link>
          <Link className='text-white' href="#">About</Link>
          <Link className='text-white' href="#">Contact Us</Link>
        </div>
      </div>

      <div className='flex justify-center'>
        <SocialMedia />
      </div>

      <div className='text-center text-white mt-3 md:mt-8 lg:mt-8 text-xs	p-4 bg-[#2928345c]'><p>Copyright 2024 all rights reserved</p></div>
    </div>
  )
}

export default Footer
