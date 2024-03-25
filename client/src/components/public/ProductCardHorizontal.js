import React from 'react'
import { ProductCardInfo } from './index'

const ProductCardHorizontal = ({ thumb, title, totalRating, price, slug }) => {
  return (
    <div className='md:w-1/3 flex-auto px-[10px] mb-[20px] flex'>
      <div className='w-full flex border'>
        <img src={thumb} alt={slug} className='w-[120px] object-contain p-4' />
        <ProductCardInfo
          title={title}
          totalRating={totalRating}
          price={price}
        />
      </div>
    </div>
  )
}

export default ProductCardHorizontal
