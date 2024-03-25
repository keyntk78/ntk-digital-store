import React from 'react'
import { NavLink } from 'react-router-dom'
const SidebarItem = ({ value, icon, path, pathLocation }) => {
  return (
    <NavLink
      className={`flex justify-between items-center w-full border-b-blue-gray-100 antialiased font-medium text-left leading-snug transition-colors border-b-0 p-3 text-[14px] cursor-pointer  hover:secondary_admin rounded-xl ${
        pathLocation === path ? 'bg-secondary_admin text-white' : ''
      }`}
      to={path}
    >
      <div className='flex items-center gap-2'>
        <span>{icon}</span>
        <p className='block antialiased text-[14px] leading-relaxed mr-auto font-medium'>
          {value}
        </p>
      </div>
    </NavLink>
  )
}

export default SidebarItem
