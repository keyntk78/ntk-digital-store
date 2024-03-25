import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navigation, TopHeader, Footer } from '../../components/public'

const Public = () => (
  <>
    <div className='w-full flex flex-col justify-center items-center font-main'>
      <TopHeader />
      <Header />
      <Navigation />
      <main className='container px-3'>
        <Outlet />
      </main>
      <Footer />
    </div>
  </>
)

export default Public
