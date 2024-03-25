import React from 'react'
import { Link } from 'react-router-dom'
import icons from '../../../utils/icons'
import { useSelector } from 'react-redux'
const Sidebar = () => {
  const { FaBars } = icons
  const { categories } = useSelector((state) => state.app)
  return (
    <div className='flex flex-col'>
      <div className='px-5 py-[10px] flex items-center bg-main text-white uppercase font-semibold text-[16px]'>
        <span className='pr-2'>
          <FaBars />
        </span>
        <span>DANH MỤC</span>
      </div>
      {categories.data?.map((el) => {
        return (
          <Link
            className='px-5 py-[10px] hover:text-main'
            key={el.slug}
            to={el.slug}
          >
            {el.title}
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
