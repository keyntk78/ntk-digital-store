import React, { Children, useEffect, useState } from 'react'

const Dialog = ({ children, showModal, title, size = '50' }) => {
  const [newSize, setNewSize] = useState('max-w-[50rem]')
  useEffect(() => {
    switch (size) {
      case '20':
        setNewSize('max-w-[20rem]')
        break
      case '30':
        setNewSize('max-w-[30rem]')
        break
      case 'sm':
        setNewSize('max-w-[30rem]')
        break
      case '40':
        setNewSize('max-w-[40rem]')
        break
      case '50':
        setNewSize('max-w-[50rem]')
        break
      case 'md':
        setNewSize('max-w-[50rem]')
        break
      case '60':
        setNewSize('max-w-[60rem]')
        break
      case '70':
        setNewSize('max-w-[70rem]')
        break
      case 'lg':
        setNewSize('max-w-[70rem]')
        break
      case '80':
        setNewSize('max-w-[80rem]')
        break
      case '90':
        setNewSize('max-w-[90rem]')
        break
      case '100':
        setNewSize('max-w-[100rem]')
        break
      case 'xl':
        setNewSize('max-w-[100rem]')
        break
      default:
        setNewSize('max-w-[50rem]')
        break
    }
  }, [size])
  let _header, _body, _footer
  Children.forEach(children, (child) => {
    if (child.type === ModalHeader) {
      return (_header = child)
    }
    if (child.type === ModalBody) {
      return (_body = child)
    }
    if (child.type === ModalFooter) {
      return (_footer = child)
    }
  })
  if (!_header)
    _header = <h3 className='text-xl font-semibold text-gray-900 '>{title}</h3>
  if (!_body) _body = <div>{children}</div>
  if (!_footer) _footer = ''

  return (
    <>
      {showModal ? (
        <div>
          <div className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
            <div
              className={`relative mx-auto p-4 w-full ${newSize} max-h-full`}
            >
              <div className='relative bg-white rounded-lg shado'>
                {_header}
                <div className='p-5 space-y-4'>{_body}</div>
                {_footer}
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

const ModalHeader = ({ children, setShowModal, color = 'primary' }) => {
  const [newColor, setColor] = useState('bg-primary')
  useEffect(() => {
    switch (color) {
      case 'primary':
        setColor('bg-primary')
        break
      case 'secondary':
        setColor('bg-secondary')
        break
      case 'danger':
        setColor('bg-danger')
        break
      default:
        setColor('bg-primary')
        break
    }
  }, [color])
  return (
    <div
      className={`flex items-center ${newColor} text-white justify-between p-4 md:p-5 border-b rounded-t`}
    >
      <h3 className='text-xl font-semibold text-white'>{children}</h3>
      <button
        type='button'
        className='bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center '
        onClick={() => setShowModal(false)}
      >
        <svg
          className='w-3 h-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 14'
        >
          <path stroke='currentColor' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
        </svg>
        <span className='sr-only'>Close modal</span>
      </button>
    </div>
  )
}
const ModalBody = ({ children }) => <div>{children}</div>
const ModalFooter = ({ children, className }) => (
  <div
    className={`flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ${className}`}
  >
    {children}
  </div>
)

Dialog.Header = ModalHeader
Dialog.Body = ModalBody
Dialog.Footer = ModalFooter

export default Dialog
