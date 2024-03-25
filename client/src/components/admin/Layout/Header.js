import React from 'react'
import icons from '../../../utils/icons'
import Profile from '../Profile'
const { FaBars } = icons
const Header = ({ isShowSidebar, setIsShowSidebar }) => {
  return (
    <div className='py-2 w-full justify-between px-6 h-[70px] bg-white flex items-center shadow-md shadow-black/5 top-0 left-0 z-30 sticky'>
      <div className='flex items-center'>
        <button
          type='button'
          className='text-lg text-gray-600 sidebar-toggle'
          onClick={() => setIsShowSidebar(!isShowSidebar)}
        >
          <FaBars />
        </button>
      </div>
      <Profile />
    </div>
  )
}

export default Header
