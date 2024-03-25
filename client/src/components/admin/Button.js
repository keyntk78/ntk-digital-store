import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Button = ({
  name,
  iconLeft,
  iconRight,
  onClick,
  size,
  color,
  className,
  link,
  outline,
  disable,
  text
}) => {
  const [newSize, setNewSize] = useState('px-4 py-2')
  const [newColor, setNewColor] = useState(
    'bg-primary hover:bg-primary_hover text-white'
  )

  //Set size
  useEffect(() => {
    switch (size) {
      case 'xs':
        setNewSize('px-[6px] py-2px')
        break
      case 'sm':
        setNewSize('px-[10px] py-[4px]')
        break
      case 'md':
        setNewSize('px-[16px] py-[6px]')
        break
      case 'lg':
        setNewSize('px-[22px] py-[8px]')
        break
      case 'xl':
        setNewSize('px-[32px] py-[10px]')
        break
      default:
        setNewSize('px-4 py-2')
        break
    }
  }, [size])

  //Set Colort
  useEffect(() => {
    switch (color) {
      case 'primary':
        if (outline) {
          setNewColor(
            'bg-white hover:bg-primary text-primary border-[1.5px] border-primary hover:text-white'
          )
        } else if (text) {
          setNewColor(
            'bg-light text-primary hover:bg-primary hover:text-white '
          )
        } else {
          setNewColor('bg-primary hover:bg-primary_hover text-white ')
        }
        break
      case 'secondary':
        if (outline) {
          setNewColor(
            'bg-white hover:bg-secondary text-secondary border-[1.5px] border-secondary    hover:text-white'
          )
        } else if (text) {
          setNewColor(
            'bg-light text-secondary hover:bg-secondary hover:text-white '
          )
        } else {
          setNewColor('bg-secondary hover:bg-secondary_hover text-white')
        }
        break
      case 'success':
        if (outline) {
          setNewColor(
            'bg-white hover:bg-success text-success border-[1.5px] border-success    hover:text-white'
          )
        } else if (text) {
          setNewColor(
            'bg-light text-success hover:bg-success hover:text-white '
          )
        } else {
          setNewColor('bg-success hover:bg-success_hover text-white')
        }
        break
      case 'danger':
        if (outline) {
          setNewColor(
            'bg-white hover:bg-danger text-danger border-[1.5px] border-danger    hover:text-white'
          )
        } else if (text) {
          setNewColor('bg-light text-danger hover:bg-danger hover:text-white ')
        } else {
          setNewColor('bg-danger hover:bg-danger_hover text-white')
        }
        break
      case 'warning':
        if (outline) {
          setNewColor(
            'bg-white hover:bg-warning text-warning border-[1.5px] border-warning    hover:text-white'
          )
        } else if (text) {
          setNewColor(
            'bg-light text-warning hover:bg-warning hover:text-white '
          )
        } else {
          setNewColor('bg-warning hover:bg-warning_hover text-white')
        }
        break
      default:
        setNewColor(color)
        break
    }
  }, [color, outline, text])

  return link ? (
    <Link
      to={link}
      className={`rounded-[8px] flex ${newColor} ${newSize} ${className}`}
    >
      <span className='text-[120%]'>{iconLeft}</span>
      <span>{name}</span>
      <span className='text-[120%]'>{iconRight}</span>
    </Link>
  ) : (
    <button
      onClick={() => {
        if (!disable) {
          onClick()
        }
      }}
      className={`rounded-[8px] flex gap-1 items-center justify-center ${
        disable ? 'cursor-context-menu bg-light text-gray-600' : newColor
      } ${newSize} ${className}`}
    >
      <span className='text-[120%]'>{iconLeft}</span>
      <span>{name}</span>
      <span className='text-[120%]'>{iconRight}</span>
    </button>
  )
}

export default Button
