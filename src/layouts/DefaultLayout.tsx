import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <>
      <Header />
      {/* <div className='flex justify-center flex-col items-center overflow-hidden '> */}
      <Outlet />
      {/* </div> */}
      <Footer />
    </>
  )
}

export default DefaultLayout
