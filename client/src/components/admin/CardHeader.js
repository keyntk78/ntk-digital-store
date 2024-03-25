import React from 'react'

const CardHeader = ({ title, children }) => {
  return (
    <div className='flex justify-between items-center'>
      <h1 className='font-semibold text-[18px]'>{title}</h1>
      <div className='flex justify-end items-center'>{children}</div>
    </div>
  )
}

export default CardHeader
