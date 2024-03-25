import React from 'react'

const PaginationItem = ({
  totalPages,
  currentPage,
  handlePaginationChange
}) => {
  const pages = []
  // Tạo một mảng các số thứ tự của trang từ 1 đến totalPages
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }
  return (
    <>
      {pages.map((pageNumber) => (
        <li key={pageNumber}>
          <button
            onClick={() => {
              if (currentPage !== pageNumber) {
                handlePaginationChange(pageNumber)
              }
            }}
            className={`${
              pageNumber === currentPage
                ? 'bg-primary text-white cursor-context-menu'
                : 'bg-white hover:bg-gray-100 hover:text-gray-700 '
            } flex items-center justify-center px-3 h-8 leading-tight   border border-gray-300`}
          >
            {pageNumber}
          </button>
        </li>
      ))}
    </>
  )
}

export default PaginationItem
