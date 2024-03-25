import React, { useEffect, useState } from 'react'
import { ProductCardHorizontal, SectionHeader } from '../index'
import { apiGetProducts } from '../../../apis/product'
const SectionFeaturedProduct = () => {
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    const response = await apiGetProducts({
      limit: 9,
      sort: '-totalRating,-createdAt',
      totalRating: { gte: 3 }
    })
    if (response.success) {
      setProducts(response.metadata.data)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <div className='w-full mb-6'>
      <SectionHeader title={' Sản phẩm tiêu biểu'} isTab={false} />
      <div className='flex flex-col md:flex-row flex-wrap mx-[-10px]'>
        {products.map((el) => {
          return (
            <ProductCardHorizontal
              key={el._id}
              thumb={el.thumb}
              title={el.title}
              totalRating={el.totalRating}
              price={el.price}
              slug={el.slug}
            />
          )
        })}
      </div>
      <div className='flex-col flex md:flex-row justify-between'>
        <img
          src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661'
          alt=''
          className='md:w-[50%] object-contain'
        />
        <div className='flex-col flex justify-between gap-4 md:w-[24%]'>
          <img
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661'
            alt=''
          />
          <img
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661'
            alt=''
          />
        </div>
        <img
          src='https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661'
          alt=''
          className=' md:w-[24%] object-contain'
        ></img>
      </div>
    </div>
  )
}

export default SectionFeaturedProduct
