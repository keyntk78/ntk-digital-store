import React, { memo } from 'react'

const Countdown = ({ value, measure }) => {
  return (
    <div className='w-[30%] py-[10px] px-[5px] h-[60px] border-secondary bg-secondary justify-center items-center flex-col flex'>
      <span className='font-semibold text-[18px]'>{value}</span>
      <span className='text-[12px]  text-[#8b8b8b]'>{measure}</span>
    </div>
  )
}

export default memo(Countdown)
