import React from 'react'
import Container from '../globals/container'
import Title from './title'
import BreadcrumbGlobal from '../globals/BreadCrumb'


function InnerBanner({title}) {
  return (
  <div>
        <div className='bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 lg:min-h-48 mobile:min-h-32 md:min-h-30 sm:min-h-28 flex items-center justify-center'>
          <Container className="md:!w-fill">
              <Title title={title}/>
              <div className='flex justify-center w-full'>
              <BreadcrumbGlobal pageName={title} PreviousPathClass={'!text-black'} caretClass={'!border-black'}/>
              </div>
          </Container>
    </div>

     
  </div>
  )
}

export default InnerBanner
