import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'

const UploadImage = ({
  value,
  setValue,
  nameKey,
  label,
  invalidFiled,
  setInvalidFiled,
  pathFile
}) => {
  const [image, setImage] = useState(value ? URL.createObjectURL(value) : null)

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    setValue((prev) => ({ ...prev, [nameKey]: file }))

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }

    if (invalidFiled && setInvalidFiled) {
      setInvalidFiled((prev) => prev.filter((item) => item.name !== nameKey))
    }
  }

  useEffect(() => {
    if (pathFile) {
      setImage(pathFile)
    }
  }, [pathFile])

  // Xử lý sự kiện khi người dùng muốn xóa hình ảnh đã tải lên
  const handleDeleteImage = () => {
    setImage(null)
    setValue((prev) => ({ ...prev, [nameKey]: null }))
    document.getElementById(nameKey).value = null
  }

  return (
    <div className='flex justify-center items-start space-x-6 flex-col'>
      <label
        htmlFor={nameKey}
        className='bg-white text-black text-base rounded w-100 p-4 h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 mb-2 fill-black'
          viewBox='0 0 32 32'
        >
          <path
            d='M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z'
            data-original='#000000'
          />
          <path
            d='M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z'
            data-original='#000000'
          />
        </svg>
        Tải lên
        <input
          type='file'
          id={nameKey}
          className='hidden'
          onChange={handleFileInputChange}
        />
        <p className='text-xs text-gray-400 mt-2'>
          Cho phép tải lên các file PNG, JPG SVG, WEBP, và GIF.
        </p>
      </label>
      {invalidFiled?.some((el) => el.name === nameKey) && (
        <span className='text-red-500 text-[12px] italic flex flex-wrap'>
          {invalidFiled.find((el) => el.name === nameKey)?.message}
        </span>
      )}
      {label && <span className='my-2 font-semibold'>{label}</span>}
      {image && (
        <div className='mt-4 flex justify-center items-center gap-2 flex-wrap'>
          <div className='relative'>
            <img
              src={image}
              alt=''
              className='h-[100px] w-100px object-cover rounded-md'
            />
            <span
              className='absolute top-1 right-1 bg-[#c4f9ff] cursor-pointer rounded-full '
              onClick={handleDeleteImage}
            >
              <MdDelete className='text-[#afafaf] hover:text-blue-300' />
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadImage
