import React from 'react'
import banner from '../../../assets/banner4.png'

const Banner = () => {
  return (
    <div className='w-full'>
      <img
        alt='banner'
        src={banner}
        className='h-[450px] w-full object-cover'
      />
    </div>
  )
}

export default Banner
