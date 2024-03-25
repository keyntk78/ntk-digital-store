import React, { useEffect, useState } from 'react'
import { TextFiled } from '../../../components/admin'
import { validate } from '../../../utils/helper'
import useApiRequest from '../../../utils/useApiRequest'

import {
  apiCreateBrand,
  apiGetByIdBrand,
  apiUpdateBrand
} from '../../../apis/brand'
import { showAlert, showToast } from '../../../utils'

const FormBrand = ({
  onSubmit,
  showModal,
  setShowModal,
  setOnSubmit,
  setReloadData,
  selected,
  setSelected
}) => {
  const [payload, setPayload] = useState({ title: '' })

  const [invalidFiled, setInvalidFiled] = useState([])

  const [validationRules] = useState({
    title: ['require']
  })

  useEffect(() => {
    const setSelectPayload = async () => {
      if (selected) {
        //call api
        const response = await apiGetByIdBrand(selected)
        if (response.success) {
          setPayload({ title: response?.metadata?.data.title })
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

  const makeRequest = useApiRequest()

  useEffect(() => {
    const submit = async () => {
      if (onSubmit) {
        const invalids = validate(payload, validationRules, setInvalidFiled)
        if (invalids === 0) {
          try {
            if (selected) {
              const updateBrand = await makeRequest(
                apiUpdateBrand,
                selected,
                payload
              )
              if (updateBrand.success) {
                showToast({
                  type: 'success',
                  message: `Cập nhật thương hiệu [${updateBrand.metadata.data.title}] thành công`
                })
                reload()
                setSelected('')
              } else {
                showAlert({
                  subject: `Cập nhật thương hiệu [${payload.title}] thất bại`,
                  message: updateBrand?.langMessage
                    ? updateBrand?.langMessage
                    : updateBrand?.message,
                  status: 'error',
                  onSuccess: () => {
                    reload()
                    setSelected('')
                  }
                })
              }
              //Edit
            } else {
              const newBrand = await makeRequest(apiCreateBrand, payload)
              if (newBrand.success) {
                showToast({
                  type: 'success',
                  message: `Thêm thương hiệu [${newBrand.metadata.data.title}] thành công`
                })
                reload()
              } else {
                showAlert({
                  subject: `Thêm thương hiệu [${payload.title}] thất bại`,
                  message: newBrand?.langMessage
                    ? newBrand?.langMessage
                    : newBrand?.message,
                  status: 'error',
                  onSuccess: () => {
                    reload()
                  }
                })
              }
            }
          } catch (error) {
            console.error('Error while creating brand:', error)
            alert(`Lỗi khi lưu: ${error.message}`)
          }
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
    setReloadData,
    setSelected,
    setShowModal,
    showModal,
    validationRules
  ])

  return (
    <div className='flex flex-col gap-3'>
      <TextFiled
        value={payload.title}
        setValue={setPayload}
        nameKey='title'
        placeholder='Tên thương hiệu'
        type={'text'}
        label={'Tên thương hiệu'}
        invalidFiled={invalidFiled}
        setInvalidFiled={setInvalidFiled}
        validate
      />
    </div>
  )
}

export default FormBrand
