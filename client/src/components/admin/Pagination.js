import React, { useEffect, useState } from 'react'
import icons from '../../utils/icons'
import PaginationItem from './PaginationItem'
const { GrPrevious, GrNext } = icons
const Pagination = ({ limit, count, currentPage, handlePaginationChange }) => {
  const [totalPages, setTotalPages] = useState(0)
  // Tính toán số lượng trang dựa trên tổng kết quả và kích thước trang
  useEffect(() => {
    const pages = Math.ceil(count / limit)
    setTotalPages(pages)
  }, [count, limit])

  return (
    <nav aria-label='Page navigation example'>
      <ul className='flex items-center -space-x-px h-8 text-sm'>
        <li>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight  bg-white border border-gray-300 rounded-s-lg ${
              currentPage === 1
                ? 'cursor-context-menu'
                : 'hover:bg-gray-100 hover:text-main_admin'
            }`}
            onClick={() => {
              if (currentPage !== 1) {
                handlePaginationChange('-')
              }
            }}
          >
            <span className='sr-only'>Previous</span>
            <GrPrevious />
          </button>
        </li>
        <PaginationItem
          totalPages={totalPages}
          currentPage={currentPage}
          handlePaginationChange={handlePaginationChange}
        />
        <li>
          <button
            onClick={() => {
              if (currentPage !== totalPages) {
                handlePaginationChange('+')
              }
            }}
            className={`flex items-center justify-center px-3 h-8 leading-tight  bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-main_admin ${
              currentPage === totalPages
                ? 'cursor-context-menu'
                : 'hover:bg-gray-100 hover:text-main_admin'
            }`}
          >
            <span className='sr-only'>Next</span>
            <GrNext />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
