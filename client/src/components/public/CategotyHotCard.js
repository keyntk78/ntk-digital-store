import React from 'react'
import icons from '../../utils/icons'
const { FaAngleRight } = icons
const CategotyHotCard = ({ thumb, title, slug, arrBrand }) => {
  return (
    <div className='md:w-1/3 flex-auto px-[10px] mb-[20px] flex'>
      <div className='w-full flex border p-[15px] min-h-[220px]'>
        <div className='flex-1 flex justify-center items-center'>
          <img
            src={thumb}
            alt={slug}
            className='w-[120px] object-contain p-4'
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <span className='font-semibold text-[15px] uppercase'>{title}</span>
          <ul className=''>
            {arrBrand.slice(0, 6).map((el) => {
              return (
                <li
                  key={el}
                  className='flex items-center cursor-pointer hover:text-main font-light text-gray-500'
                >
                  <FaAngleRight />
                  <span>{el}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CategotyHotCard
