import React, { useEffect, useRef, useState } from 'react'
import MultiDisplayItem from './MultiDisplayItem'
import MultiSelectItem from './MultiSelectItem'
// ;[
//   { title: 'Javascript', value: 'Javascript' },
//   { title: 'Asp.net', value: 'Asp.net' }
// ]
const MultiSelect = ({
  className,
  sm,
  data,
  placeholder,
  nameKey,
  value,
  setValue,
  atrValue,
  atrKey,
  atrTitle,
  label
}) => {
  const [arrValue, setArrValue] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [dataQuery, setDataQuery] = useState(data)
  const toggle = () => {
    setIsOpen((prev) => !prev)
    setDataQuery(data)
    // if (invalidFiled && setInvalidFiled) {
    //   setInvalidFiled((prev) => prev.filter((item) => item.name !== nameKey))
    // }
  }

  const dropdownRef = useRef(null)
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])
  const onChangQuery = (e) => {
    const inputValue = e.target.value.toLowerCase() // Lấy giá trị nhập vào và chuyển thành chữ thường
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(inputValue)
    ) // Lọc dữ liệu dựa trên tiêu đề
    setDataQuery(filteredData)
  }

  const handleItemClick = (item) => {
    if (arrValue.includes(item)) {
      // Nếu tồn tại, loại bỏ item khỏi mảng bằng cách sử dụng filter
      const newArr = arrValue.filter((i) => i !== item)
      const newValues = value.filter((i) => i !== item[atrValue])

      // Cập nhật arrValue với mảng mới đã loại bỏ item
      setArrValue(newArr)
      setValue((prev) => ({ ...prev, [nameKey]: newValues }))
    } else {
      // Nếu không tồn tại, thêm item vào mảng
      const newArr = [...arrValue, item]
      const newValues = [...value, item[atrValue]]
      // Cập nhật arrValue với mảng mới đã thêm item
      setArrValue(newArr)
      setValue((prev) => ({ ...prev, [nameKey]: newValues }))
    }
  }

  const handleRemoveItem = (item) => {
    if (arrValue.includes(item)) {
      // Nếu tồn tại, loại bỏ item khỏi mảng bằng cách sử dụng filter
      const newArr = arrValue.filter((i) => i !== item)
      const newValues = value.filter((i) => i !== item[atrValue])

      // Cập nhật arrValue với mảng mới đã loại bỏ item
      setArrValue(newArr)
      setValue((prev) => ({ ...prev, [nameKey]: newValues }))
    }
  }

  useEffect(() => {
    // Sử dụng filter để lọc mảng data dựa trên giá trị của mảng value
    const filteredData = data.filter((item) => value.includes(item[atrValue]))

    setArrValue(filteredData)
  }, [atrValue, data, value])

  return (
    <div className={`flex-grow ${className}`}>
      {label && (
        <label htmlFor={nameKey} className='block font-semibold mb-2'>
          {label}
        </label>
      )}
      <div className='w-full relative mx-auto flex flex-col items-cente'>
        <div className='flex flex-col items-center relative'>
          <div className='w-full'>
            <div
              ref={dropdownRef}
              className={`px-[14px] z-20 flex border bg-white rounded-md ${
                sm ? 'py-[4px]' : 'py-[8px]'
              } `}
            >
              <div className='flex flex-auto flex-wrap'>
                {arrValue.map((e) => (
                  <MultiDisplayItem
                    key={e[atrKey]}
                    title={e[atrTitle]}
                    onClick={() => {
                      handleRemoveItem(e)
                    }}
                  />
                ))}

                <div className='flex-1'>
                  <input
                    onFocus={() => {
                      setIsOpen(true)
                      setDataQuery(data)
                    }}
                    onChange={(e) => {
                      onChangQuery(e)
                    }}
                    placeholder={arrValue?.length > 0 ? '' : placeholder}
                    className='bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800'
                  />
                </div>
                <div className='text-gray-300 w-8 py-1 pl-[14px] pr-1 border-l flex items-center border-gray-200 svelte-1l8159u'>
                  <button
                    onClick={toggle}
                    className='cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='100%'
                      height='100%'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      className={`feather feather-chevron-up w-4 h-4 ${
                        isOpen ? '' : 'rotate-180'
                      }`}
                    >
                      <polyline points='18 15 12 9 6 15'></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div
              className={` ${
                isOpen ? '' : 'hidden'
              } absolute z-[9999] mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <ul className='flex flex-col w-full'>
                {dataQuery.map((e) => (
                  <MultiSelectItem
                    key={e[atrKey]}
                    onClick={() => handleItemClick(e)}
                    title={e[atrValue]}
                    selected={arrValue.some(
                      (item) => item[atrKey] === e[atrKey]
                    )}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiSelect
