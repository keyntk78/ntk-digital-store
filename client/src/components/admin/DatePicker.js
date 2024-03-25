import React, { useEffect, useState } from 'react'

const DatePicker = ({
  className,
  sm,
  type,
  value,
  setValue,
  nameKey,
  label,
  animateLabel,
  invalidFiled,
  setInvalidFiled
}) => {
  const [newType, setNewType] = useState('date')
  //Set type
  useEffect(() => {
    switch (type) {
      case 'date':
        setNewType('date')
        break
      case 'date-time':
        setNewType('datetime-local')
        break
      case 'time':
        setNewType('time')
        break
      case 'week':
        setNewType('week')
        break
      case 'month':
        setNewType('month')
        break
      case 'year':
        setNewType('number')
        break
      default:
        setNewType('date')
        break
    }
  }, [type])

  return (
    <div className={`flex-grow ${className}`}>
      {label && (
        <label htmlFor={nameKey} className='font-semibold'>
          {label}
        </label>
      )}
      <div className='w-full relative'>
        {animateLabel
          ? value?.trim() !== '' && (
              <label
                className='text-[10px] animate-slide-top-sm absolute top-0.5 left-[12px] block bg-white px-1'
                htmlFor={nameKey}
              >
                {animateLabel}
              </label>
            )
          : ''}
        <input
          type={newType}
          className={`px-[14px] rounded-md border w-full my-2 placeholder:italic outline-none  ${
            sm ? 'py-[8px]' : 'py-[12px]'
          } `}
          placeholder={type === 'year' ? 'yyyy' : ''}
          min={type === 'year' ? '1900' : ''}
          max={type === 'year' ? '2100' : ''}
          value={value}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
          }
          onFocus={() => {
            if (invalidFiled && setInvalidFiled) {
              setInvalidFiled((prev) =>
                prev.filter((item) => item.name !== nameKey)
              )
            }
          }}
        />
      </div>
      {invalidFiled?.some((el) => el.name === nameKey) && (
        <span className='text-red-500 text-[12px] italic flex flex-wrap'>
          {invalidFiled.find((el) => el.name === nameKey)?.message}
        </span>
      )}
    </div>
  )
}

export default DatePicker
