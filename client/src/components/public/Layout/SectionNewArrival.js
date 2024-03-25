import React, { useEffect, useState } from 'react'
import { SectionHeader, SliderProduct } from '../index'
import { useSelector } from 'react-redux'

const SectionNewArrival = () => {
  const { newProducts } = useSelector((state) => state.products)
  const [slidesToShow, setSlidesToShow] = useState(4)

  useEffect(() => {
    const updateSlidesToShow = () => {
      const screenWidth = window.innerWidth
      // Điều chỉnh số slidesToShow dựa trên kích thước màn hình
      if (screenWidth >= 640) {
        setSlidesToShow(3) // Kích thước màn hình lớn hơn hoặc bằng 1024px, hiển thị 4 mục
      } else {
        setSlidesToShow(2) // Mặc định hiển thị 1 mục
      }
    }

    // Gọi hàm updateSlidesToShow khi cửa sổ được resize
    window.addEventListener('resize', updateSlidesToShow)

    // Gọi hàm updateSlidesToShow khi component được mount để cập nhật giá trị ban đầu
    updateSlidesToShow()

    // Clean up
    return () => {
      window.removeEventListener('resize', updateSlidesToShow)
    }
  }, [])

  return (
    <div className='w-full mb-6'>
      <SectionHeader title={'Sản phẩm mới nhất'} isTab={false} />
      <div className='mt-4 mx-[-10px]'>
        <SliderProduct items={newProducts?.data} slidesToShow={slidesToShow} />
      </div>
    </div>
  )
}

export default SectionNewArrival
