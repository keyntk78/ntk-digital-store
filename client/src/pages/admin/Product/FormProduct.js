import React, { useEffect, useState } from 'react'
import {
  Dropdown,
  TextArea,
  TextEditor,
  TextFiled,
  UploadImage,
  UploadImages
} from '../../../components/admin'
import { apiGetCategoreis } from '../../../apis/productCategory'
import { apiGetBrands } from '../../../apis/brand'
import { convertJsonToFormData, showAlert, showToast } from '../../../utils'
import {
  apiCreateProduct,
  apiGetByIdProduct,
  apiUpdateProduct
} from '../../../apis/product'
import useApiRequest from '../../../utils/useApiRequest'
import { validate } from '../../../utils/helper'

const FormProduct = ({
  onSubmit,
  showModal,
  setShowModal,
  setOnSubmit,
  setReloadData,
  selected,
  setSelected
}) => {
  const [categories, setCategory] = useState([])
  const [brands, setBrand] = useState([])
  const [payload, setPayload] = useState({
    title: '',
    brand: '',
    category: '',
    pathFile: '',
    pathFiles: [],
    pathImagesDefault: [],
    price: 0,
    sortDescription: '',
    description: '',
    file: '',
    files: [],
    quantity: 0
  })
  const [invalidFiled, setInvalidFiled] = useState([])

  const [validationRules] = useState({
    title: ['require'],
    brand: ['require'],
    category: ['require'],
    price: ['number_require'],
    file: ['file_require'],
    files: ['arr_require']
  })

  const [validationUpdateRules] = useState({
    title: ['require'],
    brand: ['require'],
    category: ['require'],
    price: ['number_require']
  })

  useEffect(() => {
    const fectData = async () => {
      const getAllCategory = await apiGetCategoreis({ limit: -1 })
      if (getAllCategory.success) {
        setCategory(getAllCategory.metadata.data)
      }
      const getAllBrand = await apiGetBrands({ limit: -1 })

      if (getAllBrand.success) {
        setBrand(getAllBrand.metadata.data)
      }
    }

    fectData()
  }, [])

  const makeRequest = useApiRequest()
  useEffect(() => {
    const setSelectPayload = async () => {
      if (selected) {
        //call api
        const response = await apiGetByIdProduct(selected)
        if (response.success) {
          setPayload({
            title: response?.metadata?.data.title,
            brand: response?.metadata?.data.brand,
            category: response?.metadata?.data.category,
            pathFile: response?.metadata?.data.thumb,
            pathFiles: response?.metadata?.data.images,
            price: response?.metadata?.data.price,
            sortDescription: response?.metadata?.data.sortDescription,
            description: response?.metadata?.data.description,
            file: '',
            files: [],
            quantity: response?.metadata?.data.quantity
          })
        }
      }
    }
    setSelectPayload()
  }, [selected])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reload = () => {
    setShowModal(false)
    setOnSubmit(false)
    setReloadData(true)
  }
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
              const images = payload.files
              delete finalPayload.pathFile
              delete finalPayload.pathFiles
              delete finalPayload.files
              if (!payload.file) delete finalPayload.file

              const bodyFormData = await convertJsonToFormData(finalPayload)
              for (const image of images) {
                bodyFormData.append(`files`, image)
              }
              const updateProduct = await makeRequest(
                apiUpdateProduct,
                selected,
                bodyFormData
              )
              if (updateProduct.success) {
                showToast({
                  type: 'success',
                  message: `Cập nhật sản phẩm [${updateProduct.metadata.data.title}] thành công`
                })
                reload()
                setSelected('')
              } else {
                showAlert({
                  subject: `Cập nhật sản phẩm [${payload.title}] thất bại`,
                  message: updateProduct?.langMessage
                    ? updateProduct?.langMessage
                    : updateProduct?.message,
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
              const images = payload.files
              delete finalPayload.pathFile
              delete finalPayload.pathFiles
              delete finalPayload.files
              delete finalPayload.pathImagesDefault

              const bodyFormData = await convertJsonToFormData(finalPayload)
              for (const image of images) {
                bodyFormData.append(`files`, image)
              }
              const newP = await makeRequest(apiCreateProduct, bodyFormData)
              if (newP.success) {
                showToast({
                  type: 'success',
                  message: `Thêm sản phẩm [${newP.metadata.data.title}] thành công`
                })
                reload()
              } else {
                showAlert({
                  subject: `Thêm sản phẩm [${payload.title}] thất bại`,
                  message: newP?.langMessage
                    ? newP?.langMessage
                    : newP?.message,
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
    invalidFiled,
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
        placeholder='Tên sản phẩm ...'
        type={'text'}
        label={'Tên sản phẩm'}
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
        validate
      />
      <div className='flex gap-2'>
        <TextFiled
          value={payload.price}
          setValue={setPayload}
          nameKey='price'
          placeholder='Giá....đ.'
          type={'number'}
          label={'Giá'}
          min={'0'}
          invalidFiled={invalidFiled}
          setInvalidFiled={setInvalidFiled}
          validate
        />
        <TextFiled
          value={payload.quantity}
          setValue={setPayload}
          nameKey='quantity'
          placeholder='Số lượng.'
          type={'number'}
          label={'Số lượng'}
          min={'0'}
          invalidFiled={invalidFiled}
          setInvalidFiled={setInvalidFiled}
          validate
        />
      </div>

      <div className='flex gap-2'>
        <Dropdown
          nameKey={'brand'}
          value={payload.brand}
          setValue={setPayload}
          data={brands}
          atrValue='title'
          atrItem='title'
          label={'Thương hiệu'}
          placeholder={'Chọn thương hiệu'}
          atrKey={'_id'}
          isDefault
          invalidFiled={invalidFiled}
          setInvalidFiled={setInvalidFiled}
        />

        <Dropdown
          nameKey={'category'}
          value={payload.category}
          setValue={setPayload}
          data={categories}
          atrValue='title'
          atrItem='title'
          label={'Loại sản phẩm'}
          placeholder={'Chọn loại sản phẩm'}
          atrKey={'_id'}
          isDefault
          invalidFiled={invalidFiled}
          setInvalidFiled={setInvalidFiled}
        />
      </div>

      <UploadImage
        value={payload.file}
        setValue={setPayload}
        nameKey={'file'}
        label={'Ảnh mô tả'}
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
        pathFile={payload.pathFile}
      />

      <UploadImages
        value={payload.files}
        setValue={setPayload}
        nameKey={'files'}
        label={'Danh sách Hình ảnh'}
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
        pathFiles={payload.pathFiles}
        nameKeyDefault={'pathImagesDefault'}
      />
      <TextEditor
        size='300px'
        nameKey={'sortDescription'}
        value={payload.sortDescription}
        setValue={setPayload}
        label={'Mô tả'}
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
      />
      <TextEditor
        size='400px'
        nameKey={'description'}
        value={payload.description}
        setValue={setPayload}
        label={'Giới thiệu'}
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
      />
    </div>
  )
}

export default FormProduct
