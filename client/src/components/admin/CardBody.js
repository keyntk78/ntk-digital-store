import React from 'react'

const CardBody = ({ children }) => {
  return (
    <div className='flex flex-col mt-4'>
      <hr />
      <div className='pt-4'>{children}</div>
    </div>
  )
}

export default CardBody
