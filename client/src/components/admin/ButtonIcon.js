import React, { useEffect, useState } from 'react'
import Tooltip from './Tooltip'

const ButtonIcon = ({
  name,
  icon,
  size,
  color,
  onClick,
  position,
  outline,
  transparent,
  cssPSTooltip
}) => {
  const [newSize, setNewSize] = useState('p-3')
  const [newColor, setNewColor] = useState(
    'bg-primary hover:bg-primary_hover text-white'
  )

  //Set size
  useEffect(() => {
    switch (size) {
      case 'sm':
        setNewSize('p-2')
        break
      case 'md':
        setNewSize('p-3')
        break
      case 'lg':
        setNewSize('p-4')
        break
      default:
        setNewSize('p-3')
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
        } else if (transparent) {
          setNewColor(' hover:bg-gray-100 text-primary')
        } else {
          setNewColor('bg-primary hover:bg-primary_hover text-white ')
        }
        break
      case 'secondary':
        if (outline) {
          setNewColor(
            'bg-white hover:bg-secondary text-secondary border-[1.5px] border-secondary    hover:text-white'
          )
        } else if (transparent) {
          setNewColor(' hover:bg-gray-100 text-secondary')
        } else {
          setNewColor('bg-secondary hover:bg-secondary_hover text-white')
        }
        break
      case 'success':
        if (outline) {
          setNewColor(
            'bg-white hover:bg-success text-success border-[1.5px] border-success    hover:text-white'
          )
        } else if (transparent) {
          setNewColor(' hover:bg-gray-100 text-success')
        } else {
          setNewColor('bg-success hover:bg-success_hover text-white')
        }
        break
      case 'danger':
        if (outline) {
          setNewColor(
            'bg-white hover:bg-danger text-danger border-[1.5px] border-danger    hover:text-white'
          )
        } else if (transparent) {
          setNewColor(' hover:bg-gray-100 text-danger')
        } else {
          setNewColor('bg-danger hover:bg-danger_hover text-white')
        }
        break
      case 'warning':
        if (outline) {
          setNewColor(
            'bg-white hover:bg-warning text-warning border-[1.5px] border-warning    hover:text-white'
          )
        } else if (transparent) {
          setNewColor(' hover:bg-gray-100 text-warning')
        } else {
          setNewColor('bg-warning hover:bg-warning_hover text-white')
        }
        break
      default:
        setNewColor(color)
        break
    }
  }, [color, outline, transparent])

  return (
    <Tooltip title={name} position={position} cssPSTooltip={cssPSTooltip}>
      <button
        onClick={() => {
          onClick()
        }}
        className={`font-medium shadow-sm ${newColor} text-center ${newSize} rounded-full`}
      >
        {icon}
      </button>
    </Tooltip>
  )
}

export default ButtonIcon
