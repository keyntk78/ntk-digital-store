import React, { useEffect, useState } from 'react'

const Tooltip = ({ position, title, children, cssPSTooltip }) => {
  const [newPosition, setnewPosition] = useState('top-[calc(100%+0.5rem)]')
  const [svgPosition, setSvgPosition] = useState('bottom-5')
  const [point, setPoint] = useState('127.5,0 0,127.5 255,127.5')

  //Set size
  useEffect(() => {
    switch (position) {
      case 'top':
        setnewPosition('bottom-[33px]')
        setSvgPosition('top-6')
        setPoint('0,0 127.5,127.5 255,0')

        break
      case 'bottom':
        setnewPosition('top-[33px]')
        setSvgPosition('bottom-5')
        setPoint('127.5,0 0,127.5 255,127.5')

        break
      case 'md':
        setnewPosition('px-[16px] py-[6px]')
        break
      case 'lg':
        setnewPosition('px-[22px] py-[8px]')
        break
      case 'xl':
        setnewPosition('px-[32px] py-[10px]')
        break
      default:
        setnewPosition('top-[33px]')
        setSvgPosition('bottom-5')
        setPoint('127.5,0 0,127.5 255,127.5')
        break
    }
  }, [position])
  return (
    <span className='group relative'>
      <div
        className={`absolute ${
          cssPSTooltip ? cssPSTooltip : newPosition
        } left-[50%] -translate-x-[50%] hidden group-hover:block w-auto z-50`}
      >
        <div className='bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap'>
          {title}
          <svg
            className={`absolute left-0 ${svgPosition} h-2 w-full text-black`}
            x='0px'
            y='0px'
            viewBox='0 0 255 255'
          >
            <polygon className='fill-current' points={point} />
          </svg>
        </div>
      </div>
      {children}
    </span>
  )
}

export default Tooltip
