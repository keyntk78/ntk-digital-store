import React, { useEffect, useState } from 'react'
import { tabSellerHome } from '../../../utils/contants'
import { apiGetProducts } from '../../../apis/product'
import { SliderProduct } from '../index'
import { useSelector } from 'react-redux'
import { SectionHeader } from '../index'

const SectionBestSeller = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [bestSellers, setBestSellers] = useState(null)
  const { newProducts } = useSelector((state) => state.products)
  const [products, setProducts] = useState(null)
  const [slidesToShow, setSlidesToShow] = useState(3)

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: '-sold' }),
      apiGetProducts({ sort: '-createdAt' })
    ])
    if (response[0].success) {
      setBestSellers(response[0].metadata.data)
      setProducts(response[0].metadata.data)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

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

  useEffect(() => {
    if (activeTab === 1) setProducts(bestSellers)
    if (activeTab === 2) setProducts(newProducts?.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])
  return (
    <div className='mt-4 md:mt-0'>
      <SectionHeader
        isTab={true}
        arrTitle={tabSellerHome}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className='mt-4 mx-[-10px]'>
        <SliderProduct items={products} slidesToShow={slidesToShow} />
      </div>
      <div className='w-full flex-col flex md:flex-row gap-4 mt-4'>
        <img
          src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657'
          alt=''
          className='flex-1 object-contain'
        />
        <img
          src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
          alt=''
          className='flex-1 object-contain mt-1 md:mt-0'
        />
      </div>
    </div>
  )
}

export default SectionBestSeller
