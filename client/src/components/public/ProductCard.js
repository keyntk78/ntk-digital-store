import React, { useState } from 'react'
import { SelectOption, ProductCardInfo } from './index'
import icons from '../../utils/icons'
import { Link } from 'react-router-dom'
import path from '../../utils/path'

const ProductCard = ({ productData }) => {
  const { FaHeart, FaCartShopping, FaEye } = icons
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <div className='w-full text-base  px-[10px]'>
      <div
        className='border w-full flex flex-col items-center p-[15px]'
        onMouseEnter={(e) => {
          e.stopPropagation()
          setIsShowOption(true)
        }}
        onMouseLeave={(e) => {
          e.stopPropagation()
          setIsShowOption(false)
        }}
      >
        <div className='w-full relative'>
          {isShowOption && (
            <div
              className={`absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2  ${
                isShowOption === true
                  ? 'animate-slide-top'
                  : 'animate-slide-bottom'
              }`}
            >
              <SelectOption icon={<FaHeart />} />
              <SelectOption icon={<FaCartShopping />} />
              <SelectOption icon={<FaEye />} />
            </div>
          )}

          <Link to={`/${path.PRODUCTS}/${productData._id}/${productData.slug}`}>
            <img
              src={productData?.thumb || ''}
              alt={productData?.slug}
              className='w-[243px] h-[243px] object-contain'
            />
          </Link>
        </div>
        <ProductCardInfo
          title={productData.title}
          price={productData.price}
          slug={productData.slug}
          pid={productData._id}
          totalRating={productData.totalRating}
        />
      </div>
    </div>
  )
}

export default ProductCard
