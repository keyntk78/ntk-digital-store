import React from 'react'
import icons from '../../utils/icons'
const { FaSort, FaSortUp, FaSortDown } = icons
const THead = ({ theads, handleSorting, sorts }) => {
  return (
    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
      <tr>
        <th scope='col' className='p-4'>
          <div className='flex items-center'>
            <input
              id='checkbox-all-search'
              type='checkbox'
              className='w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
            />
            <label htmlFor='checkbox-all-search' className='sr-only'>
              checkbox
            </label>
          </div>
        </th>
        <th scope='col' className='px-6 py-3 uppercase'>
          STT
        </th>
        {theads.map((el) => {
          return (
            <th key={el.id} scope='col' className='px-6 py-3'>
              {el.isSort ? (
                <button
                  className='flex items-center hover:text-main_admin uppercase'
                  onClick={() => {
                    handleSorting(el.nameKey)
                  }}
                >
                  {el.title}
                  {el.nameKey !== sorts.nameKey ? (
                    <FaSort />
                  ) : sorts.value === '+' ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  )}
                </button>
              ) : (
                <div className='flex items-center uppercase'>{el.title}</div>
              )}
            </th>
          )
        })}
        <th scope='col' className='px-6 py-3 uppercase'>
          Hành động
        </th>
      </tr>
    </thead>
  )
}

export default THead
