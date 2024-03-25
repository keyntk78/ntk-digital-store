import React from 'react'
import { fortmatMoney, renderStarFromNumber } from '../../utils/helper'
import { Link } from 'react-router-dom'
import path from '../../utils/path'

const ProductCardInfo = ({
  title,
  slug,
  pid,
  totalRating,
  price,
  clsArea,
  clsTitle,
  sizeIcon,
  colorIcon,
  clsTotalRating,
  clsPrice,
  unit
}) => {
  return (
    <div className={`flex-col flex mt-[15px] w-full ${clsArea}`}>
      <Link
        className={`line-clamp-1 hover:text-main ${clsTitle}`}
        to={`/${path.PRODUCTS}/${pid}/${slug}`}
      >
        {title}
      </Link>
      <span className={`flex h-4 ${clsTotalRating}`}>
        {renderStarFromNumber(totalRating, sizeIcon, colorIcon)}
      </span>
      <span className={`${clsPrice}`}>{`${fortmatMoney(price)} ${
        unit || 'VNĐ'
      }`}</span>
    </div>
  )
}

export default ProductCardInfo
