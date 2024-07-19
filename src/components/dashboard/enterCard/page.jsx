import React from 'react'
import { MdOutlineQrCodeScanner } from "react-icons/md";


function EnterCard() {
  return (
    <div className='bg-blush-red px-8 mobile:px-4 mobile:py-4 py-12 lg:w-1/2 mobile:w-full sm:w-5/6  mx-auto rounded-[1.5rem] shadow relative card-shape'>
        <div className='flex gap-4'>
            <div>
                <img alt='cardImage' className='border-2 border-white p-1 w-20 rounded' src='/assets/credit-card.svg'/>
            </div>
            <div>
                  <h3 className='text-white text-lg	font-semibold'>Enter Card No</h3>
                  <p className='text-white'>User Card No For Coupon & Points</p>
            </div>
        </div>
        <input type="text" name="price" id="price" class="block w-full rounded-full p-4  mt-5 shadow-inherit outline-none mb-6 text-center" placeholder="Enter Card No"/>

        <div className="flex items-center justify-center flex-col absolute left-0 right-0  -bottom-12 mobile:-bottom-16">
        <button type="button" className="bg-white h-16 w-16 rounded-full flex items-center justify-center">
          <MdOutlineQrCodeScanner className='h-8 w-8 text-blush-red'/>
        </button>
        <span className='text-blush-red'>Click to Scan</span>
        </div>
    </div>
  )
}

export default EnterCard
