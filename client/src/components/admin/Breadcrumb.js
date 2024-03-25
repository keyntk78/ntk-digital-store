import React from 'react'
import { Link } from 'react-router-dom'
import icons from '../../utils/icons'
const { IoIosArrowForward } = icons
const Breadcrumb = ({ breadcrumbArr }) => {
  return (
    <div className='h-5 px-8 py-2 w-full rounded-md justify-center flex flex-col'>
      <span className='flex items-center gap-1 justify-start font-medium text-[15px]'>
        {breadcrumbArr.map((el) =>
          el?.path ? (
            <div
              key={el.name}
              className='flex items-center gap-1 justify-start font-medium text-[15px] '
            >
              <Link to={`${el.path}`} className='hover:underline'>
                {el.name}
              </Link>
              <IoIosArrowForward />
            </div>
          ) : (
            <span key={el.name} className='text-gray-600'>
              {el.name}
            </span>
          )
        )}
      </span>
    </div>
  )
}

export default Breadcrumb
