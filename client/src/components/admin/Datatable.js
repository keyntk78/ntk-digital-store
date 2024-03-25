import React, { Children, useEffect, useState } from 'react'
import THead from './THead'
import Pagination from './Pagination'
import { renderPageInfo } from '../../utils'

const Datatable = ({ children }) => {
  let _header, _body, _footer
  Children.forEach(children, (child) => {
    if (child.type === DatatableHeader) {
      return (_header = child)
    }
    if (child.type === DatatableBody) {
      return (_body = child)
    }
    if (child.type === DatatableFooter) {
      return (_footer = child)
    }
  })

  if (!_body) _body = <div>{children}</div>
  if (!_header) _header = ''
  if (!_footer) _footer = ''

  return (
    <div className='relative border overflow-x-auto sm:rounded-lg'>
      {_header}
      {_body}
      {_footer}
    </div>
  )
}

const DatatableHeader = ({ children }) => (
  <div className='p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white'>
    {children}
  </div>
)
const DatatableBody = ({ children, theads, setQuery, query }) => {
  const [sorts, setSorts] = useState({ nameKey: '', value: '' })

  const handleSorting = (nameKey) => {
    console.log(nameKey)
    setSorts((prevSorts) => {
      if (prevSorts.nameKey === nameKey) {
        switch (prevSorts.value) {
          case '+':
            return { nameKey: nameKey, value: '-' }
          case '-':
            return { nameKey: '', value: '' }
          default:
            return { nameKey: nameKey, value: '+' }
        }
      } else {
        return { nameKey: nameKey, value: '+' }
      }
    })
  }

  useEffect(() => {
    if (sorts.nameKey) {
      setQuery({
        ...query,
        sort: sorts.value === '-' ? sorts.value + sorts.nameKey : sorts.nameKey
      })
    } else {
      setQuery({ ...query, sort: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorts])

  return (
    <table className='w-full text-sm text-left text-gray-500'>
      <THead theads={theads} handleSorting={handleSorting} sorts={sorts} />
      <tbody>{children}</tbody>
    </table>
  )
}

const DatatableFooter = ({
  setQuery,
  query,
  limit,
  setLimit,
  page,
  setPage,
  count
}) => {
  //Xử lý pagesize
  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10)
    setLimit(newLimit)
    setPage(1)
    setQuery({ ...query, limit: newLimit, page: 1 })
  }

  //Xử lý phân trang
  const handlePaginationChange = (value) => {
    let newValue
    if (value === '+') {
      setPage(page + 1)
      newValue = page + 1
    } else {
      if (value === '-') {
        setPage(page - 1)
        newValue = page - 1
      } else {
        setPage(value)
        newValue = value
      }
    }

    setQuery({ ...query, page: newValue })
  }

  return (
    <div className='flex justify-between p-4'>
      <div className='flex gap-2 items-center'>
        <span>Hiển thị</span>
        <div className='flex items-center'>
          <select
            className='p-2 rounded-lg bg-white  border border-gray-300'
            defaultValue={limit}
            onChange={handleLimitChange}
          >
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
            <option value='200'>200</option>
          </select>
        </div>
      </div>
      <div className='flex gap-3 justify-end items-center'>
        <div>{renderPageInfo(limit, page, count)}</div>
        <Pagination
          limit={limit}
          count={count}
          currentPage={page}
          handlePaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  )
}
Datatable.Header = DatatableHeader
Datatable.Body = DatatableBody
Datatable.Footer = DatatableFooter

export default Datatable
