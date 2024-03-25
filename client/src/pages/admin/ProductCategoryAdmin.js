import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  Pagination,
  THead
} from '../../components/admin'
import { IoSearch } from 'react-icons/io5'
import { apiGetCategoreis } from '../../apis/productCategory'
import Swal from 'sweetalert2'
import { Bounce, toast } from 'react-toastify'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
const theads = [
  { id: 1, nameKey: 'thumb', title: 'Hình ảnh', isSort: false },
  { id: 2, nameKey: 'title', title: 'Tên loại sản phẩm', isSort: true },
  { id: 3, nameKey: 'position', title: 'Vị trí', isSort: true }
]
const ProductCategoryAdmin = () => {
  const [data, setData] = useState()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [sorts, setSorts] = useState({ nameKey: '', value: '' })
  const [query, setQuery] = useState({ limit, page })
  const [keyword, setkeyword] = useState()
  const [count, setCount] = useState(0)
  const [showModal, setShowModal] = useState(false)

  //Call API
  const fetchData = async (query) => {
    const response = await apiGetCategoreis(query)

    if (response.success) {
      setData(response.metadata.data)
      setCount(response?.metadata.counts)
    }
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

  const handOnchangeKeyWord = (evt) => {
    setkeyword(evt.currentTarget.value)
  }

  const onClickSearch = () => {
    setQuery({ ...query, keyword: keyword })
  }

  useEffect(() => {
    fetchData(query)
  }, [query])

  const saveModel = (value) => {
    toast.success('Thêm loại sản phẩm thành công!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce
    })
    setShowModal(false)
    // if (value === 1) {
    //   Swal.fire('Thành công', 'Thêm loại', 'success').then(() => {})
    // } else {
    //   Swal.fire('Thất bại!', res.langMessage || res.message, 'error')
    // }
  }

  const deleteModel = (name) => {
    Swal.fire('Cảnh báo', `Bạn có muốn xóa ${name}`, 'info').then(() => {
      Swal.fire('Thành công', 'Xóa loại sản phẩm thành công', 'success').then(
        () => {}
      )
    })
    // if (id === 1) {

    // } else {
    //   Swal.fire('Thất bại!', 'Xóa loại sản phẩm thất bại ', 'error')
    // }
  }

  return (
    <div className='rounded-md shadow-md w-full bg-white'>
      <Card>
        <CardHeader title={'Danh sách loại sản phẩm'}>
          <Button
            size={'lg'}
            onClick={() => {
              setShowModal(true)
            }}
            color={'primary'}
          >
            Thêm mới
          </Button>
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
                <Button onClick={onClickSearch} size={'sm'} color={'primary'}>
                  Tìm kiếm
                </Button>
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
                        <td className='px-6 py-4'>
                          <img src={el?.thumb} alt='' className='h-12 w-12' />
                        </td>
                        <td className='px-6 py-4'>{el?.title}</td>
                        <td className='px-6 py-4'>{el?.position}</td>
                        <td className='px-6 py-4 flex gap-2'>
                          <span class='group relative'>
                            <div class='absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto'>
                              <div class='bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap'>
                                Chỉnh sửa
                                <svg
                                  class='absolute left-0 top-full h-2 w-full text-black'
                                  x='0px'
                                  y='0px'
                                  viewBox='0 0 255 255'
                                >
                                  <polygon
                                    class='fill-current'
                                    points='0,0 127.5,127.5 255,0'
                                  />
                                </svg>
                              </div>
                            </div>
                            <button className='font-medium shadow-sm bg-primary text-center p-3 rounded-full text-white hover:bg-primary_hover_hover'>
                              <FaRegEdit />
                            </button>
                          </span>
                          <span class='group relative'>
                            <div class='absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto'>
                              <div class='bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap'>
                                Xóa
                                <svg
                                  class='absolute left-0 top-full h-2 w-full text-black'
                                  x='0px'
                                  y='0px'
                                  viewBox='0 0 255 255'
                                >
                                  <polygon
                                    class='fill-current'
                                    points='0,0 127.5,127.5 255,0'
                                  />
                                </svg>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                deleteModel(el.title)
                              }}
                              className='font-medium shadow-sm bg-danger hover:bg-danger_hover text-center p-3 rounded-full text-white'
                            >
                              <MdDelete />
                            </button>
                          </span>
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
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={'Thêm loại sản phẩm'}
        size={'xl'}
        onCancel={() => setShowModal(false)}
        onSave={() => saveModel(1)}
      >
        <span>aaa</span>
      </Modal>
    </div>
  )
}

export default ProductCategoryAdmin
