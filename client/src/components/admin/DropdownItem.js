import React from 'react'

const DropdownItem = ({ title, value, onClick, selectValue }) => {
  return (
    <li
      className={`relative cursor-pointer  border-b  py-3 pl-4 pr-9 hover:bg-[#d6e9f4] ${
        selectValue === value ? 'bg-[#d6e9f4]' : ''
      }`}
      id='listbox-option-0'
      onClick={onClick}
      // role='option'
    >
      <div className='flex items-center'>
        <span id={value} className='font-normal ml-3 block truncate'>
          {title}
        </span>
      </div>
      {selectValue === value ? (
        <span className='text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4'>
          <svg
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z' />
          </svg>
        </span>
      ) : (
        ''
      )}
    </li>
  )
}

export default DropdownItem
