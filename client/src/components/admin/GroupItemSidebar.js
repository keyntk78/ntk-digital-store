import React from 'react'
import icons from '../../utils/icons'
import SidebarItem from './SidebarItem'
const { FaChevronDown } = icons
const GroupItemSidebar = ({
  id,
  handleOpen,
  open,
  icon,
  value,
  child,
  pathLocation
}) => {
  return (
    <div className='flex flex-col'>
      <button
        className={`flex justify-between items-center w-full border-b-blue-gray-100 antialiased font-sans text-left font-medium leading-snug transition-colors border-b-0 p-3 cursor-pointer text-[14px]  hover:bg-slate-100 rounded-xl`}
        onClick={() => {
          handleOpen(id)
        }}
      >
        <div className='flex items-center gap-2'>
          <span>{icon}</span>
          <p className='block antialiased text-[14px] leading-relaxed mr-auto font-medium'>
            {value}
          </p>
        </div>
        <FaChevronDown
          className={`transition-transform ${open === id ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`flex-col flex ${open === id ? '' : 'hidden'}`}>
        {child.map((el) => (
          <SidebarItem
            key={el.id}
            icon={el.icon}
            value={el.value}
            path={el.path}
            pathLocation={pathLocation}
          />
        ))}
      </div>
    </div>
  )
}

export default GroupItemSidebar
