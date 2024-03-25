import React from 'react'

const Card = ({ children, isShadow = true, className }) => {
  return (
    <div
      className={`rounded-[8px] border px-8 py-6 w-full bg-white ${
        isShadow ? 'shadow-sm' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
