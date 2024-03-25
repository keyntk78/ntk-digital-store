import React, { useEffect } from 'react'
import SidebarItem from '../SidebarItem'
import { sidebarAdmin } from '../../../utils/contants'
import { Link, useLocation } from 'react-router-dom'
import GroupItemSidebar from '../GroupItemSidebar'
import logo from '../../../assets/logo1.png'
import path from '../../../utils/path'

const Sidebar = ({ isShowSidebar }) => {
  const [open, setOpen] = React.useState(0)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }
  const location = useLocation()
  useEffect(() => {
    // Duyệt qua mảng sidebarAdmin2 để tìm sự trùng khớp
    sidebarAdmin.forEach((item) => {
      // Nếu phần tử có thuộc tính child, cũng duyệt qua các phần tử con
      if (item?.child) {
        item.child.forEach((childItem) => {
          if (childItem.path === location.pathname) {
            setOpen(item.id)
            return
          }
        })
      } else {
        setOpen(0)
      }
    })
  }, [location.pathname])

  return (
    <div
      className={`bg-white w-full left-0 max-w-[240px] shadow-md shadow-blue-gray-800/5 ease-in-out duration-30 fixed h-screen z-30 ${
        isShowSidebar ? '' : 'hidden'
      }`}
    >
      <div className='flex px-4 items-center justify-center h-[70px]'>
        <Link to={path.ADMIN}>
          <img src={logo} alt='brand' />
        </Link>
      </div>
      <div className='flex-col flex gap-1 mt-1 px-4 pb-4  overflow-y-auto h-screen'>
        {sidebarAdmin.map((el) => {
          if (el?.child) {
            return (
              <GroupItemSidebar
                id={el.id}
                key={el.id}
                handleOpen={handleOpen}
                open={open}
                value={el.value}
                child={el.child}
                icon={el.icon}
                pathLocation={location.pathname}
              />
            )
          } else {
            return (
              <SidebarItem
                value={el.value}
                icon={el.icon}
                key={el.id}
                path={el.path}
                pathLocation={location.pathname}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default Sidebar
