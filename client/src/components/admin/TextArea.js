import React from 'react'

const TextArea = ({
  className,
  rows,
  nameKey,
  value,
  setValue,
  placeholder,
  iconleft,
  label,
  animateLabel,
  invalidFiled,
  setInvalidFiled
}) => {
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
        <div className='absolute inset-y-0 font-semibold text-gray-500 text-[20px] start-0 flex items-center ps-3 pointer-events-none'>
          {iconleft}
        </div>
        <textarea
          id='message'
          rows={rows || 4}
          className={`rounded-md p-2.5 w-full border px-[14px] py-[12px] my-2 placeholder:italic outline-none ${
            iconleft ? 'ps-10' : ''
          }`}
          placeholder={placeholder}
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
        ></textarea>
      </div>
      {invalidFiled?.some((el) => el.name === nameKey) && (
        <span className='text-red-500 text-[12px] italic flex flex-wrap'>
          {invalidFiled.find((el) => el.name === nameKey)?.message}
        </span>
      )}
    </div>
  )
}

export default TextArea
