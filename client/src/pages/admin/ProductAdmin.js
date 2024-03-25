import React, { memo, useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  THead
} from '../../components/admin'
import { apiGetProducts } from '../../apis/product'
import icons from '../../utils/icons'
import { Link } from 'react-router-dom'
import { fortmatMoney } from '../../utils/helper'
const { IoSearch } = icons
const theads = [
  { id: 1, nameKey: 'image', title: 'Hình ảnh', isSort: false },
  { id: 2, nameKey: 'title', title: 'Tên sản phẩm', isSort: true },
  { id: 3, nameKey: 'price', title: 'Giá', isSort: true },
  { id: 4, nameKey: 'category', title: 'Loại sản phẩm', isSort: true },
  { id: 4, nameKey: 'brand', title: 'Thương hi', isSort: true },

  { id: 5, nameKey: 'quantity', title: 'Số lượng', isSort: true }
]

const ProductAdmin = () => {
  const [data, setData] = useState()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [sorts, setSorts] = useState({ nameKey: '', value: '' })
  const [query, setQuery] = useState({ limit, page })
  const [keyword, setkeyword] = useState()
  const [count, setCount] = useState(0)

  //Call API
  const fetchData = async (query) => {
    const response = await apiGetProducts(query)

    if (response.success) {
      setData(response.metadata.data)
      setCount(response?.metadata.counts)
    }
  }

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
  const handleSorting = (nameKey) => {
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

  const handOnchangeKeyWord = (evt) => {
    setkeyword(evt.currentTarget.value)
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

  const onClickSearch = () => {
    setQuery({ ...query, keyword: keyword })
  }

  useEffect(() => {
    fetchData(query)
  }, [query])

  return (
    <div className='rounded-md shadow-md w-full bg-white'>
      <Card>
        <CardHeader title={'Danh sách sản phẩm'}>
          <Button name={'Thêm mới'} />
        </CardHeader>
        <CardBody>
          <div className='relative border overflow-x-auto sm:rounded-lg'>
            <div className='p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white'>
              <div></div>
              <div className='flex justify-end gap-1 items-center'>
                <div>
                  <label htmlFor='table-search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
                      <IoSearch />
                    </div>
                    <input
                      type='text'
                      id='table-search-users'
                      className='block p-2 ps-10 text-sm border focus:outline-none border-gray-300 rounded-lg w-80 bg-white'
                      placeholder='Tìm kiếm'
                      onChange={(evt) => handOnchangeKeyWord(evt)}
                    />
                  </div>
                </div>
                <Button
                  name={'Tìm kiếm'}
                  className={'px-4 py-[7px]'}
                  handelOnclick={onClickSearch}
                />
              </div>
            </div>
            <table className='w-full text-sm text-left text-gray-500'>
              <THead
                theads={theads}
                handleSorting={handleSorting}
                sorts={sorts}
              />
              <tbody>
                {!data ? (
                  <tr>
                    <td colSpan={7} className='p-6 text-center'>
                      Không có bản ghi nào
                    </td>
                  </tr>
                ) : (
                  data?.map((el) => {
                    return (
                      <tr
                        className='bg-white border-b hover:bg-gray-50 '
                        key={el?._id}
                      >
                        <td className='w-4 p-4'>
                          <div className='flex items-center'>
                            <input
                              id='checkbox-table-search-1'
                              type='checkbox'
                              className='w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                            />
                          </div>
                        </td>
                        <td className='px-6 py-4'>{el?.title}</td>
                        <td className='px-6 py-4'>{el?.brand}</td>
                        <td className='px-6 py-4'>
                          {fortmatMoney(el?.price)} đ
                        </td>
                        <td className='px-6 py-4'>{el?.category}</td>
                        <td className='px-6 py-4'>{el?.quantity}</td>
                        <td className='px-6 py-4'>
                          <Link
                            href='#'
                            className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
            <div className='flex justify-between p-4'>
              <div className='flex gap-2 items-center'>
                <span>Hiển thị</span>
                <div className='flex items-center'>
                  <select
                    className='p-2 rounded-lg bg-white  border border-gray-300'
                    defaultValue={limit}
                    onChange={handleLimitChange}
                  >
                    <option value={10}>10</option>
                    <option value='20'>20</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                    <option value='200'>200</option>
                  </select>
                </div>
              </div>
              <div className='flex gap-2 justify-end items-center'>
                <Pagination
                  limit={limit}
                  count={count}
                  currentPage={page}
                  handlePaginationChange={handlePaginationChange}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default memo(ProductAdmin)
