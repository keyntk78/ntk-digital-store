import React, { useEffect, useState } from 'react'
import { SectionHeader, CategotyHotCard } from '../index'
import { useSelector } from 'react-redux'

const SectionHotCollection = () => {
  const [hotCategories, setHotCategories] = useState([])
  const { categories } = useSelector((state) => state.app)
  useEffect(() => {
    setHotCategories(categories?.data?.slice(0, 6))
  }, [categories])
  return (
    <div className='w-full mb-6'>
      <SectionHeader title={'Danh mục nổi bật'} isTab={false} />
      <div className='flex flex-col md:flex-row flex-wrap mx-[-10px]'>
        {hotCategories?.map((el) => {
          return (
            <CategotyHotCard
              title={el?.title}
              key={el._id}
              thumb={el?.thumb}
              slug={el.slug}
              arrBrand={el.brand}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SectionHotCollection
