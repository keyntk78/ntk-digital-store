import React from 'react'
import { navigation } from '../../../utils/contants'
import { NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

const Navigation = () => {
  return (
    <div className='hidden md:flex container h-[48px] mb-6 py-2 border-y px-3 text-sm  items-center'>
      <div className='lg:hidden md:block'>
        <FaBars size={25} className='cursor-pointer' />
      </div>
      <div className='hidden lg:block'>
        {navigation.map((e) => {
          return (
            <NavLink
              to={e.path}
              key={e.id}
              className={({ isActive }) =>
                isActive
                  ? 'pr-12 hover:text-main text-main'
                  : 'pr-12 hover:text-main'
              }
            >
              {e.value}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Navigation
