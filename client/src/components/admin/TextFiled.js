import React from 'react'

const TextFiled = ({
  value,
  setValue,
  nameKey,
  type,
  placeholder,
  iconleft,
  iconRight,
  label,
  invalidFiled,
  setInvalidFiled,
  sm,
  className,
  min,
  max,
  animateLabel
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

        <input
          min={min ? min : ''}
          max={max ? max : ''}
          type={type || 'text'}
          className={`px-[14px] rounded-md border w-full my-2 placeholder:italic outline-none  ${
            sm ? 'py-[8px]' : 'py-[12px]'
          } ${iconleft ? 'ps-10' : ''} ${iconRight ? 'pe-10' : ''}`}
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
        />
        <div className='absolute font-semibold text-gray-500 text-[20px] inset-y-0 end-3 flex items-center pointer-events-none'>
          {iconRight}
        </div>
      </div>
      {invalidFiled?.some((el) => el.name === nameKey) && (
        <span className='text-red-500 text-[12px] italic flex flex-wrap'>
          {invalidFiled.find((el) => el.name === nameKey)?.message}
        </span>
      )}
    </div>
  )
}

export default TextFiled
