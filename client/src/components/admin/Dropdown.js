import React, { useEffect, useRef, useState } from 'react'
import { PiCaretUpDown } from 'react-icons/pi'
import DropdownItem from './DropdownItem'

const Dropdown = ({
  className,
  sm,
  nameKey,
  value,
  setValue,
  renderItem,
  data,
  atrItem,
  placeholder,
  isDefault,
  atrValue,
  label,
  animateLabel,
  invalidFiled,
  setInvalidFiled,
  atrKey
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [valueDisplay, setValueDisplay] = useState()
  const buttonRef = useRef(null)
  const toggle = () => {
    setIsOpen((prev) => !prev)
    if (invalidFiled && setInvalidFiled) {
      setInvalidFiled((prev) => prev.filter((item) => item.name !== nameKey))
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // Đóng khi click bên ngoài button
        setIsOpen(false)
      }
    }
    // Thêm event listener vào body
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      // Gỡ bỏ event listener khi component unmount
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    //Hiển default nếu có
    if (value?.trim() !== '') {
      const foundItem = data.find((item) => item[atrValue] === value)
      if (!foundItem) {
        setValueDisplay(placeholder || 'Choose options')
      } else {
        setValueDisplay(renderItem ? renderItem(foundItem) : foundItem[atrItem])
        setValue((prev) => ({ ...prev, [nameKey]: foundItem[atrValue] }))
      }
    } else {
      if (isDefault) {
        setValueDisplay(placeholder || 'Choose options')
      } else {
        const dataOne = data[0]
        setValueDisplay(renderItem ? renderItem(dataOne) : dataOne[atrItem])
        setValue((prev) => ({ ...prev, [nameKey]: dataOne[atrValue] }))
      }
    }
  }, [
    atrItem,
    atrValue,
    data,
    isDefault,
    nameKey,
    placeholder,
    renderItem,
    setValue,
    value
  ])

  const handleDropdownItemClick = (title, value) => {
    setValueDisplay(title)
    setValue((prev) => ({ ...prev, [nameKey]: value }))
  }
  return (
    <div className={`flex-grow ${className}`}>
      {label && (
        <label htmlFor={nameKey} className='block font-semibold mb-2'>
          {label}
        </label>
      )}
      <div className='w-full relative'>
        {animateLabel
          ? value?.trim() !== '' && (
              <label
                className='text-[10px] z-30 animate-slide-top-sm absolute top-[-6px] left-[12px] block bg-white px-1'
                htmlFor={nameKey}
              >
                {animateLabel}
              </label>
            )
          : ''}
        <button
          ref={buttonRef}
          type='button'
          className={`relative w-full cursor-pointer rounded-md border bg-white  px-[14px] ${
            sm ? 'py-[8px]' : 'py-[12px]'
          }`}
          onClick={toggle}
        >
          <span className='flex items-center'>
            <span className='ml-3 block truncate'>{valueDisplay}</span>
          </span>
          <span className='pointer-events-none absolute text-gray-500 inset-y-0 right-0 ml-3 flex items-center pr-2'>
            <PiCaretUpDown />
          </span>
        </button>

        <ul
          id={nameKey}
          className={`${
            isOpen ? '' : 'hidden'
          } absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          {isDefault && (
            <li
              className='relative border-b  cursor-pointer  py-3 pl-4 pr-9 hover:bg-[#e8f7ff]'
              id='listbox-option-0'
              onClick={() =>
                handleDropdownItemClick(placeholder || 'Choose options', '')
              }
            >
              <div className='flex items-center'>
                <span id={value} className='font-normal ml-3 block truncate'>
                  {placeholder || 'Choose options'}
                </span>
              </div>
            </li>
          )}
          {data.map((e) => (
            <DropdownItem
              key={atrKey ? e[atrKey] : e.id}
              value={e[atrValue]}
              title={renderItem ? renderItem(e) : e[atrItem]}
              selectValue={value}
              onClick={() =>
                handleDropdownItemClick(
                  renderItem ? renderItem(e) : e[atrItem],
                  e[atrValue]
                )
              }
            />
          ))}
        </ul>
      </div>
      {invalidFiled?.some((el) => el.name === nameKey) && (
        <span className='text-red-500 text-[12px] italic flex flex-wrap'>
          {invalidFiled.find((el) => el.name === nameKey)?.message}
        </span>
      )}
    </div>
  )
}

export default Dropdown
