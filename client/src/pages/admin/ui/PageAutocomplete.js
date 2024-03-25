import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  Modal,
  MultiSelect,
  UploadImage
} from '../../../components/admin'
import { Fa5 } from 'react-icons/fa6'
import { validate } from '../../../utils/helper'
import FormText from './FormText'
import { apiGetBrands } from '../../../apis/brand'

const users = [
  {
    id: '1',
    name: 'Tuấn Kiệt',
    icon: <Fa5 />,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU'
  },
  {
    id: '2',
    name: 'Nhật Trường',
    icon: <Fa5 />,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU'
  },
  {
    id: '3',
    name: 'Anh Nhật',
    icon: <Fa5 />,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU'
  },
  {
    id: '4',
    name: 'Văn Can',
    icon: <Fa5 />,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU'
  },
  {
    id: '5',
    name: 'Việt Trinh',
    icon: <Fa5 />,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU'
  },
  {
    id: '6',
    name: 'Trúc Diệp',
    icon: <Fa5 />,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU'
  },
  {
    id: '7',
    name: 'Thị Ý',
    icon: <Fa5 />,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU'
  },
  {
    id: '8',
    name: 'Quang Toản',
    icon: <Fa5 />,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU'
  },
  {
    id: '9',
    name: 'Thanh Hải',
    icon: <Fa5 />,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU'
  }
]

const Languages = [
  { id: '1', title: 'Javascript', value: 'Javascript' },
  { id: '2', title: 'Python', value: 'Python' },
  { id: '3', title: 'Java', value: 'Java' },
  { id: '4', title: 'C++', value: 'C++' },
  { id: '5', title: 'Ruby', value: 'Ruby' },
  { id: '6', title: 'C#', value: 'C#' },
  { id: '7', title: 'Swift', value: 'Swift' },
  { id: '8', title: 'Go', value: 'Go' },
  { id: '9', title: 'PHP', value: 'PHP' },
  { id: '10', title: 'TypeScript', value: 'TypeScript' }
]

const RenderItemUser = (e) => {
  return (
    <span className='flex gap-2 items-center'>
      <img src={e['img']} alt='' className='w-5 h-5 rounded' />
      <span>{`${e['name']}`}</span>
    </span>
  )
}

const PageAutocomplete = () => {
  const [payload, setPayload] = useState({ user: '' })
  const [showModal, setShowModal] = useState(false)
  const [payload1, setPayload1] = useState({ user: '' })
  const [payload2, setPayload2] = useState({ user: '' })
  const [payload3, setPayload3] = useState({ user: 'Việt Trinh' })
  const [payload4, setPayload4] = useState({ user: '' })
  const [payload5, setPayload5] = useState({ user: '' })
  const [payload6, setPayload6] = useState({ user: '' })
  const [payload7, setPayload7] = useState({ user: '' })
  const [payload8, setPayload8] = useState({ langues: ['Python', 'Ruby'] })
  const [payload10, setPayload10] = useState({ langues: [] })

  const [invalidFiledPayload7, setInvalidFiledPayload7] = useState([])
  const [payload9, setPayload9] = useState({ image: null })

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
  const [validationRulesPayload7] = useState({
    user: ['require']
  })
  const onClickSubmitpayload7 = () => {
    const invalids = validate(
      payload7,
      validationRulesPayload7,
      setInvalidFiledPayload7
    )
    if (invalids === 0) {
      alert(`Xin chào ${payload7.user}`)
    }
  }
  console.log(payload9)
  return (
    <Card>
      <CardHeader title={'Selects'} />
      <CardBody>
        <div className='flex gap-2'>
          <Card isShadow={false}>
            <CardHeader title={'Dropdown'} />
            <CardBody>
              <div className='flex gap-1'>
                <Dropdown
                  nameKey={'user'}
                  value={payload.user}
                  setValue={setPayload}
                  data={users}
                  atrValue='name'
                  atrItem='name'
                  isDefault
                />
              </div>
              <div className='flex gap-1 mt-2'>
                <Dropdown
                  className=''
                  nameKey={'user'}
                  value={payload1.user}
                  setValue={setPayload1}
                  data={users}
                  atrValue='name'
                  atrItem='name'
                  isDefault
                  placeholder={'Chọn người dùng'}
                />
                <Button
                  size={'lg'}
                  color={'success'}
                  name={'Submit'}
                  onClick={() => {
                    alert(payload1.user)
                  }}
                />
              </div>
              <div className='flex gap-1 mt-2'>
                <Dropdown
                  nameKey={'user'}
                  value={payload2.user}
                  setValue={setPayload2}
                  atrValue='name'
                  data={users}
                  atrItem='name'
                  placeholder={'Chọn người dùng'}
                />
                <Button
                  size={'lg'}
                  color={'success'}
                  name={'Submit'}
                  onClick={() => {
                    alert(payload2.user)
                  }}
                />
              </div>
              <div className='flex gap-1 mt-2'>
                <Dropdown
                  nameKey={'user'}
                  value={payload3.user}
                  setValue={setPayload3}
                  atrValue='name'
                  data={users}
                  atrItem='name'
                  placeholder={'Chọn người dùng'}
                />
                <Button
                  size={'lg'}
                  color={'success'}
                  name={'Submit'}
                  onClick={() => {
                    alert(payload3.user)
                  }}
                />
              </div>
              <div className='flex gap-1 mt-2'>
                <Dropdown
                  nameKey={'user'}
                  value={payload4.user}
                  setValue={setPayload4}
                  atrValue='name'
                  data={users}
                  renderItem={RenderItemUser}
                  placeholder={'Chọn người dùng'}
                />
                <Button
                  size={'lg'}
                  color={'success'}
                  name={'Submit'}
                  onClick={() => {
                    alert(payload4.user)
                  }}
                />
              </div>
            </CardBody>
          </Card>
          <Card isShadow={false}>
            <CardHeader title={'Label and validate'} />
            <CardBody>
              <Dropdown
                nameKey={'user'}
                value={payload5.user}
                setValue={setPayload5}
                data={users}
                placeholder={'Chọn người dùng'}
                atrValue='name'
                atrItem='name'
                isDefault
                label={'Người dùng'}
              />
              <Button
                className={'mt-2'}
                size={'lg'}
                color={'success'}
                name={'Submit'}
                onClick={() => {
                  alert(payload5.user)
                }}
              />

              <Dropdown
                className={'mt-2'}
                nameKey={'user'}
                value={payload6.user}
                setValue={setPayload6}
                data={users}
                placeholder={'Chọn người dùng'}
                atrValue='name'
                atrItem='name'
                isDefault
                animateLabel={'Người dùng'}
              />
              <Button
                className={'mt-2'}
                size={'lg'}
                color={'success'}
                name={'Submit'}
                onClick={() => {
                  alert(payload6.user)
                }}
              />

              <Dropdown
                className={'mt-2'}
                nameKey={'user'}
                value={payload6.user}
                setValue={setPayload7}
                data={users}
                placeholder={'Chọn người dùng'}
                atrValue='name'
                atrItem='name'
                isDefault
                animateLabel={'Người dùng'}
                invalidFiled={invalidFiledPayload7}
                setInvalidFiled={setInvalidFiledPayload7}
              />
              <Button
                className={'mt-2'}
                size={'lg'}
                color={'success'}
                name={'Submit'}
                onClick={() => {
                  onClickSubmitpayload7()
                }}
              />
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-2'>
          <Card isShadow={false}>
            <CardHeader title={'MultiSelect'} />
            <CardBody>
              <MultiSelect
                data={brands}
                placeholder={'Chọn ngôn ngữ'}
                value={payload8.langues}
                setValue={setPayload8}
                nameKey={'langues'}
                atrKey={'_id'}
                atrTitle={'title'}
                atrValue={'title'}
              />
              <Button
                className={'mt-4'}
                size={'lg'}
                color={'success'}
                name={'Submit'}
                onClick={() => {
                  console.log(payload8)
                }}
              />
            </CardBody>
          </Card>
          <Card isShadow={false}>
            <CardHeader title={'Label and validate'} />
            <CardBody>
              <UploadImage
                nameKey={'image'}
                value={payload9.image}
                setValue={setPayload9}
              />
            </CardBody>
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
      <Modal showModal={showModal} setShowModal={setShowModal} size={'md'}>
        <Modal.Header>
          <h3 className='font-semibold text-[20px]'>Thêm loại sản phẩm</h3>
        </Modal.Header>
        <Modal.Body>
          <Card isShadow={false}>
            <CardBody>
              <MultiSelect
                data={brands}
                placeholder={'Chọn ngôn ngữ'}
                value={payload8.langues}
                setValue={setPayload8}
                nameKey={'langues'}
                atrKey={'_id'}
                atrTitle={'title'}
                atrValue={'title'}
              />
              <MultiSelect
                className={'mt-2'}
                data={Languages}
                placeholder={'Chọn ngôn ngữ'}
                value={payload10.langues}
                setValue={setPayload10}
                nameKey={'langues'}
                atrKey={'id'}
                atrTitle={'title'}
                atrValue={'title'}
              />
              <Button
                className={'mt-4'}
                size={'lg'}
                color={'success'}
                name={'Submit'}
                onClick={() => {
                  console.log(payload8)
                }}
              />
            </CardBody>
          </Card>
          {/* <FormText /> */}

          {/* <FormProductCategory
            onSubmit={onSubmit}
            showModal={showModal}
            setShowModal={setShowModal}
            setOnSubmit={setOnSubmit}
            setReloadData={setReloadData}
            selected={selected}
            setSelected={setSelected}
          /> */}
        </Modal.Body>
        <Modal.Footer>
          <div className='flex gap-2 justify-end items-center w-full'>
            <Button
              name={'Đóng'}
              size={'md'}
              color={'danger'}
              text
              onClick={() => {
                setShowModal(false)
              }}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </Card>
  )
}

export default PageAutocomplete
