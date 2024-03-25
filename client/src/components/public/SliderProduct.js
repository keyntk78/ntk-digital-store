import React from 'react'
import Slider from 'react-slick'
import { ProductCard } from './index'

const SliderProduct = ({ items, slidesToShow }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow || 3,
    slidesToScroll: 1,
  }
  return (
    <Slider {...settings}>
      {items?.map((el) => {
        return <ProductCard key={el._id} productData={el} />
      })}
    </Slider>
  )
}

export default SliderProduct
