import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonIcon,
  Card,
  CardBody,
  CardHeader,
  Datatable,
  Modal,
  TextFiled
} from '../../../components/admin'
import { IoSearch } from 'react-icons/io5'
import { calculateIndex, showAlert, showToast } from '../../../utils'
import { MdDelete, MdEdit } from 'react-icons/md'
import FormProduct from './FormProduct'
import useApiRequest from '../../../utils/useApiRequest'
import { apiDeleteProduct, apiGetProducts } from '../../../apis/product'

const ProductAdmin = () => {
  const theads = [
    { id: 1, nameKey: 'thumb', title: 'Hình ảnh', isSort: false },
    { id: 2, nameKey: 'title', title: 'Tên loại sản phẩm', isSort: true },
    { id: 3, nameKey: 'price', title: 'Giá', isSort: true },
    { id: 4, nameKey: 'brand', title: 'Thương hiệu', isSort: true },
    { id: 5, nameKey: 'category', title: 'Loại sản phẩm', isSort: true },
    { id: 6, nameKey: 'quantity', title: 'Số lượng', isSort: true }
  ]
  const [data, setData] = useState()
  const [showModal, setShowModal] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState({ limit, page })
  const [search, setSearch] = useState({ keyword: '' })
  const [count, setCount] = useState(0)
  const [onSubmit, setOnSubmit] = useState(false)
  const [reloadData, setReloadData] = useState(false)
  const [selected, setSelected] = useState('')
  const makeRequest = useApiRequest()

  //Call API
  const fetchData = async (query) => {
    const response = await apiGetProducts(query)

    if (response.success) {
      setData(response.metadata.data)
      setCount(response?.metadata.counts)
    }
  }

  const onClickSearch = () => {
    setQuery({ ...query, keyword: search.keyword })
  }

  useEffect(() => {
    fetchData(query)
  }, [query])

  useEffect(() => {
    if (reloadData) {
      setLimit(10)
      setPage(1)
      setSearch({ keyword: '' })
      fetchData({ limit: 10, page: 1 })
      setReloadData(false)
    }
  }, [reloadData])

  const onClickEdit = (id) => {
    setSelected(id)
    setShowModal(true)
  }

  const onClickDelete = (id, name) => {
    const deleted = async () => {
      showAlert({
        subject: `Xóa sản phẩm [${name}]`,
        message: `Bạn có muốn xóa [${name}]?`,
        status: 'info',
        type: 'confirmation',
        onSuccess: async () => {
          const response = await makeRequest(apiDeleteProduct, id)
          if (response.success) {
            showToast({
              type: 'success',
              message: `Xóa sản phẩm [${name}] thành công`
            })
            setReloadData(true)
          } else {
            showAlert({
              subject: `Xóa sản phẩm ${name} thất bại`,
              message: response?.langMessage
                ? response?.langMessage
                : response?.message,
              status: 'error'
            })
          }
        }
      })
    }

    deleted()
  }

  useEffect(() => {
    if (!showModal) {
      setSelected('')
    }
  }, [showModal])

  return (
    <>
      <Card>
        <CardHeader title={'Danh sách loại sản phẩm'}>
          <Button
            size={'lg'}
            onClick={() => {
              setShowModal(true)
            }}
            color={'primary'}
            name={'Thêm mới'}
          />
        </CardHeader>
        <CardBody>
          <Datatable>
            <Datatable.Header>
              <div className='header-left'></div>
              <div className='header-right flex items-center gap-2'>
                <TextFiled
                  value={search.keyword}
                  setValue={setSearch}
                  nameKey='keyword'
                  placeholder='Tìm kiếm...'
                  type={'text'}
                  iconleft={<IoSearch />}
                  sm
                />
                <Button
                  name={'Tìm kiếm'}
                  size={'lg'}
                  color={'primary'}
                  onClick={() => {
                    onClickSearch()
                  }}
                />
              </div>
            </Datatable.Header>
            <Datatable.Body theads={theads} query={query} setQuery={setQuery}>
              {!data ? (
                <tr>
                  <td colSpan={7} className='p-6 text-center'>
                    Không có bản ghi nào
                  </td>
                </tr>
              ) : (
                data?.map((el, index) => {
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
                        {calculateIndex(index, limit, page)}
                      </td>
                      <td className='px-6 py-4 flex items-center'>
                        <img
                          src={el?.thumb}
                          alt=''
                          className='h-10 w-10 rounded-sm'
                        />
                      </td>
                      <td className='px-6 py-4'>{el?.title}</td>
                      <td className='px-6 py-4'>{el?.price}</td>
                      <td className='px-6 py-4'>{el?.brand}</td>
                      <td className='px-6 py-4'>{el?.category}</td>
                      <td className='px-6 py-4'>{el?.quantity}</td>

                      <td className='px-6 py-4 flex gap-2'>
                        <ButtonIcon
                          onClick={() => {
                            onClickEdit(el._id)
                          }}
                          color={'secondary'}
                          size={'md'}
                          icon={<MdEdit />}
                          name={'Chỉnh sửa'}
                          cssPSTooltip={'top-[45px]'}
                        />
                        <ButtonIcon
                          onClick={() => {
                            onClickDelete(el._id, el.title)
                          }}
                          color={'danger'}
                          size={'md'}
                          icon={<MdDelete />}
                          name={'Xóa'}
                          cssPSTooltip={'top-[45px]'}
                        />
                      </td>
                    </tr>
                  )
                })
              )}
            </Datatable.Body>
            <Datatable.Footer
              query={query}
              setQuery={setQuery}
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              count={count}
            />
          </Datatable>
        </CardBody>
      </Card>
      <Modal showModal={showModal} size={'lg'}>
        <Modal.Header
          setShowModal={setShowModal}
          color={selected ? 'secondary' : 'primary'}
        >
          {selected ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        </Modal.Header>
        <Modal.Body>
          <FormProduct
            onSubmit={onSubmit}
            showModal={showModal}
            setShowModal={setShowModal}
            setOnSubmit={setOnSubmit}
            setReloadData={setReloadData}
            selected={selected}
            setSelected={setSelected}
          />
        </Modal.Body>
        <Modal.Footer className={'justify-end gap-3'}>
          <Button
            name={'Đóng'}
            size={'md'}
            color={'danger'}
            text
            onClick={() => {
              setShowModal(false)
            }}
          />
          <Button
            name={'Xác nhận'}
            size={'md'}
            color={selected ? 'secondary' : 'primary'}
            onClick={() => {
              setOnSubmit(true)
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductAdmin
