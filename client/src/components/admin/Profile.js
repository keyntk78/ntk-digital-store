import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
const Profile = () => {
  const [isShowDropdown, setIsShowDropdown] = useState(false)

  return (
    <div className='relative w-full flex justify-end'>
      <button type='button' className='dropdown-toggle flex items-center'>
        <img
          src={`${avatar}`}
          alt=''
          className='w-12 h-12 rounded block object-cover align-middle'
          onClick={() => setIsShowDropdown(!isShowDropdown)}
        />
      </button>
      <ul
        className={`absolute top-[54px] dropdown-menu shadow-md shadow-black/5 z-30 py-1.5 rounded-md bg-white border border-gray-100 ${
          isShowDropdown ? '' : 'hidden'
        }`}
      >
        <li>
          <Link
            href='#'
            className='flex items-center text-[15px] gap-1 py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50'
          >
            <FaUser /> Thông tin cá nhân
          </Link>
        </li>
        <li>
          <Link
            href='#'
            className='flex items-center text-[15px] gap-1 py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50'
          >
            <RiLockPasswordLine /> Đổi mật khẩu
          </Link>
        </li>
        <li>
          <Link
            href='#'
            className='flex items-center text-[15px] gap-1 py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50'
          >
            <IoIosLogOut /> Đăng xuất
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Profile
