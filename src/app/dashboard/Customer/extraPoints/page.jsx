"use client"
import ExtraPoints from '@/components/customerdashboard/extraPoints'
import CustomerHeader from '@/components/customerdashboard/header/customerHeader'
import DashboardFooter from '@/components/dashboard/dashboardfooter/page'
import Container from '@/components/globals/container'
import TopHeader from '@/components/home/homeHeader/topheader'
import InnerBanner from '@/components/innerpagebanner/page'
import React, { useState } from 'react'
import Image from 'next/image'
import Modal from '@/components/globals/Modal'
import { AiFillCheckCircle } from 'react-icons/ai'


function ExtraPage() {

  const [viewExtraPointsModal, setViewExtraPointsModal] = useState(false)
  const handleViewExtraPointsModal = () => setViewExtraPointsModal(!viewExtraPointsModal)

  return (
    <div>
            <TopHeader />
            <CustomerHeader />
            <InnerBanner title={"Extra Points"} />

            <div className="py-16 mobile:py-6 mobile:p-4 bg-gray-100">
            <Container>
            <div className=" mb-12">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <h2 className=" text-center text-2xl font-semibold">
                  Extra  Poinst
                        </h2>
                <div className="w-full md:w-72">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Search
                    </label>
                  </div>
                </div>
               
              </div>
               </div>

             
               <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4">

                <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                      <div onClick={handleViewExtraPointsModal}>
                      <ExtraPoints />
                      </div>
                  </div>
                  <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                      <div onClick={handleViewExtraPointsModal}>
                      <ExtraPoints />
                      </div>
                  </div>
                  <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                      <div onClick={handleViewExtraPointsModal}>
                      <ExtraPoints />
                      </div>
                  </div>
                  <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                      <div onClick={handleViewExtraPointsModal}>
                      <ExtraPoints />
                      </div>
                  </div>
                  <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                      <div onClick={handleViewExtraPointsModal}>
                      <ExtraPoints />
                      </div>
                  </div>
                  <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                      <div onClick={handleViewExtraPointsModal}>
                      <ExtraPoints />
                      </div>
                  </div>
                  <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                      <div onClick={handleViewExtraPointsModal}>
                      <ExtraPoints />
                      </div>
                  </div>
                  <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                      <div onClick={handleViewExtraPointsModal}>
                      <ExtraPoints />
                      </div>
                  </div>
              </div>
             

              <Modal size={"sm"} open={viewExtraPointsModal} handleOpen={handleViewExtraPointsModal}>
            <div className="bg-gradient-to-r from-blush-red to-pink-300 text-lg font-semibold text-white p-4 text-left rounded-t-md"><h1>Extra Points Details</h1></div>
            <div className='p-4 relative'>

              <div className=''>
                <div className=' p-1 shadow rounded-full w-32 h-32 flex items-center justify-center mx-auto'>
                  <Image
                    src="/assets/store.png"
                    width={150}
                    height={150}
                    alt="Picture of the author"
                    className='rounded-full w-28 h-28'
                  />
                </div>

                <div>
                  <h3 className="text-center font-semibold text-lg mb-2 mt-2 text-black">Dummy Product</h3>
                  <div className='flex justify-center'>
                    <h5 class="absolute top-0 right-0 m-5 bg-blush-red text-white text-sm font-medium me-2 px-3 py-1.5 rounded-full dark:bg-pink-900 dark:text-pink-300 inline-flex items-center gap-1"><AiFillCheckCircle className='w-6 h-6' />
                      250 Points</h5>
                  </div>
                </div>

                <div className='flex justify-center	gap-8 my-2'>
                  <h3 className='font-medium text-md text-black'><b className='text-blush-red'>Qty :</b> 00</h3>
                  <h3 className='font-medium text-md text-black'><b className='text-blush-red'>g</b> : 00</h3>
                </div>

              </div>
              <p className='text-gray-500 text-base mt-2 font-normal text-center'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>

            </div>
          </Modal>
            </Container>
            </div>
            <DashboardFooter/>
    </div>
  )
}

export default ExtraPage
