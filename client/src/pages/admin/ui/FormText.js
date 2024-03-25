import React, { useEffect, useState } from 'react'
import { apiGetBrands } from '../../../apis/brand'
import { MultiSelect } from '../../../components/admin'

const FormText = () => {
  const [brands, setBrands] = useState([])
  const [payload, setPayload] = useState({
    title: '',
    brand: [],
    thumb: '',
    position: 0
  })
  useEffect(() => {
    const getAllBrands = async () => {
      const getAllBrands = await apiGetBrands({ limit: -1 })
      if (getAllBrands.success) {
        setBrands(getAllBrands.metadata.data)
      }
    }
    getAllBrands()
  }, [])
  return (
    <div>
      <MultiSelect
        data={brands}
        placeholder={'Chọn thương hiệu'}
        value={payload.brand}
        setValue={setPayload}
        nameKey={'brand'}
        atrKey={'_id'}
        atrTitle={'title'}
        atrValue={'title'}
        label={'Thương hiệu'}
      />
    </div>
  )
}

export default FormText
