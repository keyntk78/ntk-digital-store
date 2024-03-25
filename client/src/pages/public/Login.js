import React, { useCallback, useState } from 'react'
import bg from '../../assets/bg-login.jpg'
import { InputField, ButtonXL } from '../../components/public/index'
import { apiLogin, apiRegister } from '../../apis/user'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { login } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
import { validate } from '../../utils/helper'
import { FaArrowLeft } from 'react-icons/fa'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
  })

  const [validationRules] = useState({
    email: ['require', 'email'],
    password: ['require', 'password'],
    firstname: ['require'],
    lastname: ['require'],
    mobile: ['require', 'min:10']
  })

  const [invalidFiled, setInvalidFiled] = useState([])
  const [isRegister, setRegister] = useState(false)

  // Reset payload
  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: ''
    })
  }

  //Handle Submit
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload

    const invalids = isRegister
      ? validate(payload, validationRules, setInvalidFiled)
      : validate(data, validationRules, setInvalidFiled)
    // alert()
    if (invalids === 0) {
      if (isRegister) {
        const res = await apiRegister(payload)
        if (res.success) {
          Swal.fire(
            'Thành công',
            res.langMessage || res.message,
            'success'
          ).then(() => {
            setRegister(false)
            resetPayload()
          })
        } else {
          Swal.fire('Thất bại!', res.langMessage || res.message, 'error')
        }
      } else {
        // alert('login')
        const rs = await apiLogin(data)
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              userInfo: rs.user,
              accessToken: rs.accessToken
            })
          )
          navigate(`/${path.HOME}`)
        } else {
          Swal.fire('Thất bại!', rs.langMessage || rs.message, 'error')
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, isRegister])

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh'
      }}
      className='w-screen h-screen relative'
    >
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='p-8 bg-white rounded-md min-w-[500px]'>
          <h1 className='text-[28px] font-semibold  text-main mb-8 text-center'>
            {isRegister ? 'Đăng ký' : 'Đăng nhập'}
          </h1>
          {isRegister ? (
            <>
              <div className='flex gap-2 md:flex-row flex-col'>
                <InputField
                  value={payload.firstname}
                  setValue={setPayload}
                  nameKey='firstname'
                  placeholder='Họ'
                  label={'Họ'}
                  invalidFiled={invalidFiled}
                  setInvalidFiled={setInvalidFiled}
                />
                <InputField
                  value={payload.lastname}
                  setValue={setPayload}
                  nameKey='lastname'
                  placeholder='Tên'
                  label={'Tên'}
                  invalidFiled={invalidFiled}
                  setInvalidFiled={setInvalidFiled}
                />
              </div>
              <InputField
                value={payload.mobile}
                setValue={setPayload}
                nameKey='mobile'
                placeholder='Số điệnt thoại'
                label={'Số điệnt thoại'}
                invalidFiled={invalidFiled}
                setInvalidFiled={setInvalidFiled}
              />
            </>
          ) : (
            ''
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey='email'
            placeholder='Tài khoản'
            label={'Tài khoản'}
            invalidFiled={invalidFiled}
            setInvalidFiled={setInvalidFiled}
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey='password'
            placeholder='Mật khẩu'
            type={'password'}
            label={'Mật khẩu'}
            invalidFiled={invalidFiled}
            setInvalidFiled={setInvalidFiled}
          />
          <ButtonXL
            addCls={'rounded-md'}
            title={isRegister ? 'Đăng ký' : 'Đăng nhập'}
            handleOnclick={handleSubmit}
          />
          {isRegister ? (
            <div className='flex justify-center items-center my-2'>
              <span
                className='text-blue-500 mt-2 flex justify-center items-center hover:underline  cursor-pointer'
                onClick={() => {
                  setRegister(false)
                  resetPayload()
                  setInvalidFiled([])
                }}
              >
                <FaArrowLeft />
                Quay lại
              </span>
            </div>
          ) : (
            <div className='flex flex-col my-2'>
              <div className='flex justify-between items-center my-2'>
                <span className='text-blue-500 hover:underline cursor-pointer'>
                  Quên mật khẩu
                </span>
                <span
                  className='text-blue-500 hover:underline cursor-pointer'
                  onClick={() => {
                    setRegister(true)
                    resetPayload()
                    setInvalidFiled([])
                  }}
                >
                  Đăng ký
                </span>
              </div>
              <div className='flex justify-center items-center'>
                <Link
                  className='pl-2 text-blue-500 flex items-center hover:underline cursor-pointer'
                  to={`/${path.HOME}`}
                >
                  <FaArrowLeft />
                  Trang chủ
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
