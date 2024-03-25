import React, { useEffect, useState } from 'react'
import {
  Dropdown,
  MultiSelect,
  TextFiled,
  UploadImage
} from '../../../components/admin'
import { apiGetBrands } from '../../../apis/brand'
import { validate } from '../../../utils/helper'
import { convertJsonToFormData, showAlert, showToast } from '../../../utils'
import {
  apiCreateProductCategory,
  apiGetByIdProductCategory,
  apiGetCategoreis,
  apiUpdateProductCategory
} from '../../../apis/productCategory'
import useApiRequest from '../../../utils/useApiRequest'
const FormProductCategory = ({
  onSubmit,
  showModal,
  setShowModal,
  setOnSubmit,
  setReloadData,
  selected,
  setSelected
}) => {
  const [payload, setPayload] = useState({
    title: '',
    brand: [],
    file: '',
    pathFile: '',
    parentId: '',
    position: 0
  })

  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])

  const [invalidFiled, setInvalidFiled] = useState([])

  const [validationRules] = useState({
    title: ['require']
  })

  const [validationUpdateRules] = useState({
    title: ['require']
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reload = () => {
    setShowModal(false)
    setOnSubmit(false)
    setReloadData(true)
  }

  useEffect(() => {
    const getAllBrands = async () => {
      const getAllBrands = await apiGetBrands({ limit: -1 })
      if (getAllBrands.success) {
        setBrands(getAllBrands.metadata.data)
      }

      const getAllCategories = await apiGetCategoreis({ limit: -1 })
      if (getAllCategories.success) {
        setCategories(getAllCategories.metadata.data)
      }
    }
    getAllBrands()
  }, [])

  console.log(categories)

  const makeRequest = useApiRequest()

  useEffect(() => {
    const setSelectPayload = async () => {
      if (selected) {
        //call api
        const response = await apiGetByIdProductCategory(selected)
        if (response.success) {
          setPayload({
            title: response?.metadata?.data.title,
            brand: response?.metadata?.data.brand,
            position: response?.metadata?.data.position,
            pathFile: response?.metadata?.data.thumb,
            parentId: response?.metadata?.data.parentId
          })
        }
      }
    }
    setSelectPayload()
  }, [selected])

  useEffect(() => {
    const submit = async () => {
      if (onSubmit) {
        try {
          if (selected) {
            const invalids = validate(
              payload,
              validationUpdateRules,
              setInvalidFiled
            )
            if (invalids === 0) {
              const finalPayload = { ...payload }
              delete finalPayload.pathFile
              const bodyFormData = await convertJsonToFormData(finalPayload)

              console.log(bodyFormData)
              const updatePC = await makeRequest(
                apiUpdateProductCategory,
                selected,
                bodyFormData
              )
              if (updatePC.success) {
                showToast({
                  type: 'success',
                  message: `Cập nhật loại sản phẩm [${updatePC.metadata.data.title}] thành công`
                })
                reload()
                setSelected('')
              } else {
                showAlert({
                  subject: `Cập nhật loại sản phẩm [${payload.title}] thất bại`,
                  message: updatePC?.langMessage
                    ? updatePC?.langMessage
                    : updatePC?.message,
                  status: 'error',
                  onSuccess: () => {
                    reload()
                    setSelected('')
                  }
                })
              }
            }
            //Edit
          } else {
            const invalids = validate(payload, validationRules, setInvalidFiled)
            if (invalids === 0) {
              const finalPayload = { ...payload }
              delete finalPayload.pathFile
              const bodyFormData = await convertJsonToFormData(finalPayload)
              console.log(bodyFormData)

              const newPC = await makeRequest(
                apiCreateProductCategory,
                bodyFormData
              )
              if (newPC.success) {
                showToast({
                  type: 'success',
                  message: `Thêm loại sản phẩm [${newPC.metadata.data.title}] thành công`
                })
                reload()
              } else {
                showAlert({
                  subject: `Thêm loại sản phẩm [${payload.title}] thất bại`,
                  message: newPC?.langMessage
                    ? newPC?.langMessage
                    : newPC?.message,
                  status: 'error',
                  onSuccess: () => {
                    reload()
                  }
                })
              }
            }
          }
        } catch (error) {
          console.error('Error while creating brand:', error)
          alert(`Lỗi khi lưu: ${error.message}`)
        }

        setOnSubmit(false)
      }
    }

    submit()
  }, [
    makeRequest,
    onSubmit,
    payload,
    reload,
    selected,
    setOnSubmit,
    setSelected,
    validationRules,
    validationUpdateRules
  ])

  return (
    <div className='flex flex-col gap-3'>
      <TextFiled
        value={payload.title}
        setValue={setPayload}
        nameKey='title'
        placeholder='Tên loại sản phẩm ...'
        type={'text'}
        label={'Tên loại sản phẩm'}
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
        validate
      />
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
      <TextFiled
        className={'w-1/3'}
        value={payload.position}
        setValue={setPayload}
        nameKey='position'
        placeholder='Vị trí ...'
        type={'number'}
        label={'Vị trí'}
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
        validate
      />

      <Dropdown
        nameKey={'parentId'}
        value={payload.parentId}
        setValue={setPayload}
        data={categories}
        atrValue='_id'
        atrItem='title'
        label={'Loại sản phẩm'}
        placeholder={'Chọn loại sản phẩm'}
        atrKey={'_id'}
        isDefault
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
      />
      <UploadImage
        value={payload.file}
        setValue={setPayload}
        nameKey={'file'}
        label={'Ảnh mô tả'}
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
        pathFile={payload.pathFile}
      />
    </div>
  )
}

export default FormProductCategory
