import React from 'react'

const SupportCard = ({ icon, title, subtitle, className }) => {
  return (
    <div className={`flex flex-col items-center px-6 border-r ${className}`}>
      <span className='flex gap-3  items-center'>
        {icon}
        <span className='font-semibold '>{title}</span>
      </span>
      <span>{subtitle}</span>
    </div>
  )
}

export default SupportCard
