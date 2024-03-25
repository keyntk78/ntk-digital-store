import React from 'react'

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  placeholder,
  label,
  invalidFiled,
  setInvalidFiled
}) => {
  return (
    <div className='w-full relative'>
      {value.trim() !== '' && (
        <label
          className='text-[10px] animate-slide-top-sm absolute top-0.5 left-[12px] block bg-white px-1'
          htmlFor={nameKey}
        >
          {label}
        </label>
      )}
      <input
        type={type || 'text'}
        className='px-4 py-2 rounded-sm border w-full my-2 placeholder:italic outline-none'
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() =>
          setInvalidFiled((prev) =>
            prev.filter((item) => item.name !== nameKey)
          )
        }
      />
      {invalidFiled?.some((el) => el.name === nameKey) && (
        <span className='text-red-500 text-[12px] italic flex flex-wrap'>
          {invalidFiled.find((el) => el.name === nameKey)?.message}
        </span>
      )}
    </div>
  )
}

export default InputField
