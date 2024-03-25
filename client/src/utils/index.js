// File: swalUtils.js
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { Bounce } from 'react-toastify'

export const showAlert = ({
  subject,
  message,
  status,
  onSuccess,
  type = 'alert'
}) => {
  switch (type) {
    case 'confirmation':
      Swal.fire({
        title: subject,
        text: message,
        icon: status,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess()
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })
      break
    case 'alert':
    default:
      Swal.fire(subject, message, status).then(() => {
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess()
        }
      })
      break
  }
}

export const showToast = ({ message, type, options = {}, errorCallback }) => {
  try {
    switch (type) {
      case 'success':
        toast.success(message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
          ...options // Override default options with provided options
        })
        break
      case 'error':
        toast.error(message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
          ...options // Override default options with provided options
        })
        break
      case 'warning':
        toast.warn(message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
          ...options
        })
        break
      // Thêm các loại toast khác nếu cần
      default:
        break
    }
  } catch (error) {
    console.error('Error occurred while displaying toast:', error)
    if (errorCallback && typeof errorCallback === 'function') {
      errorCallback(error)
    }
  }
}

export const calculateIndex = (index, limit, page) => {
  // Tính số thứ tự bắt đầu của trang hiện tại
  const startIndex = (page - 1) * limit + 1

  // Trả về số thứ tự dựa trên chỉ mục và số thứ tự bắt đầu của trang hiện tại
  return startIndex + (index + 1) - 1
}

export const renderPageInfo = (limit, page, count) => {
  const startIndex = (page - 1) * limit + 1
  const endIndex = Math.min(page * limit, count)

  return `${startIndex}-${endIndex} / ${count}`
}

export async function convertJsonToFormData(jsonData) {
  const formData = new FormData()

  const handleArray = (key, array) => {
    array.forEach((item, index) => {
      const subItemKey = `${key}[${index}]`
      formData.append(subItemKey, item)
    })
  }

  Object.keys(jsonData).forEach((key) => {
    const value = jsonData[key]
    if (Array.isArray(value)) {
      handleArray(key, value)
    } else {
      formData.append(key, value)
    }
  })

  return formData
}
