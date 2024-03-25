import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  MultiSelect
} from '../../../components/admin'
import { apiGetBrands } from '../../../apis/brand'
const PageCheckBox = () => {
  const [payload, setPayload] = useState({ brand: [] })
  const [showModal, setShowModal] = useState(false)

  const [brands, setBrands] = useState([])
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
    <Card>
      <CardHeader title={'CheckBõ'} />
      <CardBody>
        <div className='flex gap-2'>
          <Card isShadow={false}>
            <CardHeader title={'MultiSelect'} />
            <CardBody>
              <Dialog showModal={showModal} setShowModal={setShowModal}>
                <Dialog.Header setShowModal={setShowModal} color='danger'>
                  Thêm sản phẩm
                </Dialog.Header>
                <Dialog.Body>
                  <MultiSelect
                    data={brands}
                    placeholder={'Chọn ngôn ngữ'}
                    value={payload.brand}
                    setValue={setPayload}
                    nameKey={'brand'}
                    atrKey={'_id'}
                    atrTitle={'title'}
                    atrValue={'title'}
                  />
                </Dialog.Body>
                <Dialog.Footer className={'justify-end gap-2'}>
                  <Button
                    size={'md'}
                    onClick={() => {
                      setShowModal(true)
                    }}
                    color={'danger'}
                    text
                    name={'Đóng'}
                  />
                  <Button
                    size={'md'}
                    onClick={() => {
                      setShowModal(true)
                    }}
                    color={'primary'}
                    name={'Xác nhận'}
                  />
                </Dialog.Footer>
              </Dialog>
            </CardBody>
          </Card>
          <Card isShadow={false}>
            <CardHeader title={'Label and validate'} />
            {/* <CardBody>
              <UploadImage
                nameKey={'image'}
                value={payload9.image}
                setValue={setPayload9}
              />
            </CardBody>
            */}
            <Button
              size={'lg'}
              onClick={() => {
                setShowModal(true)
              }}
              color={'primary'}
              name={'Thêm mới'}
            />
          </Card>
        </div>
        <div className='h-[500px]'></div>
      </CardBody>
    </Card>
  )
}

export default PageCheckBox
