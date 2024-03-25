import React from 'react'

const MultiDisplayItem = ({ title, onClick }) => {
  return (
    <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700  border border-teal-300 '>
      <div className='text-xs font-normal leading-none max-w-full flex-initial'>
        {title}
      </div>
      <div className='flex flex-auto flex-row-reverse' onClick={onClick}>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='100%'
            height='100%'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2'
          >
            <line x1='18' y1='6' x2='6' y2='18'></line>
            <line x1='6' y1='6' x2='18' y2='18'></line>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default MultiDisplayItem
