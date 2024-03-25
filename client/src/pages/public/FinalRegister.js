import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import Swal from 'sweetalert2'
import bg from '../../assets/bg-login.jpg'
import { apiFinnalRegister } from '../../apis/user'

const FinalRegister = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const fetchApi = async () => {
    const response = await apiFinnalRegister(token)
    if (response.success) {
      console.log('1')
      Swal.fire('Thành công!', 'Xác nhận thành công!', 'success').then(() => {
        navigate(`/${path.LOGIN}`)
      })
    } else {
      console.log('2')
      Swal.fire('Thất bại!', 'Xác nhận thất bại', 'error').then(() => {
        navigate(`/${path.LOGIN}`)
      })
    }
  }

  useEffect(() => {
    fetchApi()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
    ></div>
  )
}

export default FinalRegister
