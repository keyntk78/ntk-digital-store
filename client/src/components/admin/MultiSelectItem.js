import React from 'react'

const MultiSelectItem = ({ title, onClick, selected }) => {
  return (
    <li
      className={`relative cursor-pointer  border-b py-3 pl-4 pr-9 hover:bg-[#d6e9f4]  ${
        selected ? 'bg-[#d6e9f4]' : ''
      }`}
      onClick={onClick}
    >
      <div className='flex w-full items-center border-transparent border-l-2 relative'>
        <div className='w-full items-center flex'>
          <div className='mx-2 leading-6  '>{title}</div>
        </div>
      </div>
      {selected ? (
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

export default MultiSelectItem
