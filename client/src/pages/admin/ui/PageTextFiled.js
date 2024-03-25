import React, { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  TextArea,
  TextEditor,
  TextFiled
} from '../../../components/admin'
import icons from '../../../utils/icons'
import { IoMail } from 'react-icons/io5'
import { validate } from '../../../utils/helper'
import { MdOutlineMessage } from 'react-icons/md'
const { IoSearch, MdDateRange } = icons

const PageTextFiled = () => {
  const [payload, setPayload] = useState({
    email: '',
    password: ''
  })

  const [invalidFiled, setInvalidFiled] = useState([])

  const [validationRules] = useState({
    email: ['require', 'email'],
    password: ['require', 'password']
  })

  const [search, setSearch] = useState({
    keyWord: ''
  })

  const onClickSearch = () => {
    alert(search.keyWord)
  }

  const onClickSubmit = () => {
    const invalids = validate(payload, validationRules, setInvalidFiled)
    if (invalids === 0) {
      alert(`Xin chào ${payload.email}`)
    }
  }
  const [demo1, setDemo1] = useState({
    name: ''
  })
  const [demo2, setDemo2] = useState({
    name: ''
  })
  const [demo3, setDemo3] = useState({
    name: ''
  })
  const [demo4, setDemo4] = useState({
    name: ''
  })

  const [demo5, setDemo5] = useState({
    name: ''
  })
  const [demo6, setDemo6] = useState({
    name: ''
  })

  const [demo7, setDemo7] = useState({
    name: ''
  })
  const [invalidFiledDemo7, setInvalidFiledDemo7] = useState([])

  const [validationRulesDemo7] = useState({
    name: ['require']
  })
  const onClickSubmitDemo7 = () => {
    const invalids = validate(demo7, validationRulesDemo7, setInvalidFiledDemo7)
    if (invalids === 0) {
      alert(`Xin chào ${demo7.name}`)
    }
  }

  const [demo8, setDemo8] = useState({
    date: ''
  })

  const [demo9, setDemo9] = useState({
    date: ''
  })

  const [demo10, setDemo10] = useState({
    date: ''
  })
  const [demo11, setDemo11] = useState({
    date: ''
  })
  const [demo12, setDemo12] = useState({
    date: ''
  })
  const [demo13, setDemo13] = useState({
    date: ''
  })

  const [demo14, setDemo14] = useState({
    date: ''
  })

  const [demo15, setDemo15] = useState({
    description: ''
  })

  const [invalidFiledDemo14, setInvalidFiledDemo14] = useState([])

  const [validationRulesDemo14] = useState({
    date: ['require']
  })
  const onClickSubmitDemo14 = () => {
    const invalids = validate(
      demo14,
      validationRulesDemo14,
      setInvalidFiledDemo14
    )
    if (invalids === 0) {
      alert(`Xin chào ngày ${demo14.date}`)
    }
  }

  return (
    <Card>
      <CardHeader title={'TextFileds'} />
      <CardBody>
        <div className='flex gap-2'>
          <Card isShadow={false}>
            <CardHeader title={'Default'} />
            <CardBody>
              <div className='flex items-center gap-2'>
                <TextFiled
                  value={search.keyWord}
                  setValue={setSearch}
                  nameKey='keyWord'
                  placeholder='Tìm kiếm...'
                  type={'text'}
                  sm
                />
                <Button
                  name={'Tìm kiếm'}
                  size={'lg'}
                  color={'primary'}
                  onClick={() => onClickSearch()}
                />
              </div>

              <TextFiled
                placeholder={'Họ tên'}
                value={demo1.name}
                setValue={setDemo1}
                nameKey='name'
              />
              <TextFiled
                placeholder={'Tìm kiếm ...'}
                value={demo2.name}
                setValue={setDemo2}
                nameKey='name'
                iconleft={<IoSearch />}
              />
              <TextFiled
                placeholder={'Tìm kiếm ...'}
                value={demo3.name}
                setValue={setDemo3}
                nameKey='name'
                iconRight={<MdDateRange />}
              />
            </CardBody>
          </Card>
          <Card isShadow={false}>
            <CardHeader title={'Label and validate'} />
            <CardBody>
              <TextFiled
                value={payload.email}
                setValue={setPayload}
                nameKey='email'
                placeholder='Email'
                type={'text'}
                label={'Email'}
                iconleft={<IoMail />}
                invalidFiled={invalidFiled}
                setInvalidFiled={setInvalidFiled}
                validate
              />
              <TextFiled
                value={payload.password}
                setValue={setPayload}
                nameKey='password'
                placeholder='Mật khẩu'
                type={'password'}
                animateLabel={'Mật khẩu'}
                invalidFiled={invalidFiled}
                setInvalidFiled={setInvalidFiled}
                validate
              />
              <div>
                <Button
                  name={'Submit'}
                  size={'lg'}
                  color={'primary'}
                  onClick={() => onClickSubmit()}
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-2 mt-4'>
          <Card isShadow={false}>
            <CardHeader title={'Text area'} />
            <CardBody>
              <TextArea
                rows={6}
                nameKey={'name'}
                value={demo4.name}
                setValue={setDemo4}
                placeholder={'Mô tả ...'}
              />

              <TextArea
                rows={6}
                nameKey={'name'}
                value={demo5.name}
                setValue={setDemo5}
                placeholder={'Mô tả ...'}
                iconleft={<MdOutlineMessage />}
              />
            </CardBody>
          </Card>
          <Card isShadow={false}>
            <CardHeader title={'Label and validate'} />
            <CardBody>
              <TextArea
                rows={6}
                nameKey={'name'}
                value={demo6.name}
                setValue={setDemo6}
                placeholder={'Mô tả ...'}
                label={'Mô tả'}
              />
              <TextArea
                rows={6}
                nameKey={'name'}
                value={demo7.name}
                setValue={setDemo7}
                placeholder={'Mô tả ...'}
                animateLabel={'Mô tả'}
                invalidFiled={invalidFiledDemo7}
                setInvalidFiled={setInvalidFiledDemo7}
              />
              <div>
                <Button
                  name={'Submit'}
                  size={'lg'}
                  color={'primary'}
                  onClick={() => onClickSubmitDemo7()}
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-2 mt-4'>
          <Card isShadow={false}>
            <CardHeader title={'Datepicker'} />
            <CardBody>
              <DatePicker
                type={'date'}
                value={demo8.date}
                setValue={setDemo8}
                nameKey={'date'}
              />
              <DatePicker
                type={'date-time'}
                value={demo9.date}
                setValue={setDemo9}
                nameKey={'date'}
              />
              <DatePicker
                type={'time'}
                value={demo10.date}
                setValue={setDemo10}
                nameKey={'date'}
              />
              <DatePicker
                type={'week'}
                value={demo11.date}
                setValue={setDemo11}
                nameKey={'date'}
              />
              <DatePicker
                type={'month'}
                value={demo12.date}
                setValue={setDemo12}
                nameKey={'date'}
              />
              <DatePicker
                type={'year'}
                value={demo8.date}
                setValue={setDemo8}
                nameKey={'date'}
              />
            </CardBody>
          </Card>
          <Card isShadow={false}>
            <CardHeader title={'Label and validate'} />
            <CardBody>
              <DatePicker
                type={'date'}
                value={demo13.date}
                setValue={setDemo13}
                nameKey={'date'}
                label={'Ngày sinh'}
              />
              <DatePicker
                type={'date'}
                value={demo14.date}
                setValue={setDemo14}
                nameKey={'date'}
                animateLabel={'Ngày sinh'}
                invalidFiled={invalidFiledDemo14}
                setInvalidFiled={setInvalidFiledDemo14}
              />
              <div>
                <Button
                  name={'Submit'}
                  size={'lg'}
                  color={'primary'}
                  onClick={() => onClickSubmitDemo14()}
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-2 mt-4'>
          <Card isShadow={false}>
            <CardHeader title={'TextEditor'} />
            <CardBody>
              <TextEditor
                size='500px'
                value={demo15.description}
                setValue={setDemo15}
                label={'Mô tả'}
                nameKey={'description'}
              />
            </CardBody>
          </Card>
        </div>
      </CardBody>
    </Card>
  )
}

export default PageTextFiled
