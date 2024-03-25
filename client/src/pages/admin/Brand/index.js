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
import { apiDeleteBrand, apiGetBrands } from '../../../apis/brand'
import FormBrand from './FormBrand'
import { calculateIndex, showAlert, showToast } from '../../../utils'
import { MdDelete, MdEdit } from 'react-icons/md'
import useApiRequest from '../../../utils/useApiRequest'

const BrandAdmin = () => {
  const theads = [
    { id: 1, nameKey: 'title', title: 'Tên thương hiệu', isSort: true },
    { id: 2, nameKey: 'slug', title: 'Slug', isSort: true }
  ]
  const [data, setData] = useState()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState({ limit, page })
  const [search, setSearch] = useState({ keyword: '' })
  const [count, setCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [onSubmit, setOnSubmit] = useState(false)
  const [reloadData, setReloadData] = useState(false)
  const [selected, setSelected] = useState('')
  const makeRequest = useApiRequest()
  //Call API
  const fetchData = async (query) => {
    const response = await apiGetBrands(query)

    if (response.success) {
      setData(response.metadata.data)
      setCount(response?.metadata.counts)
    }
  }

  const onClickSearch = () => {
    setQuery({ ...query, keyword: search.keyword })
  }

  const onClickEdit = (id) => {
    setSelected(id)
    setShowModal(true)
  }

  const onClickDelete = (id, name) => {
    const deleted = async () => {
      showAlert({
        subject: `Xóa thương hiệu [${name}]`,
        message: `Bạn có muốn xóa [${name}]?`,
        status: 'info',
        type: 'confirmation',
        onSuccess: async () => {
          const response = await makeRequest(apiDeleteBrand, id)
          if (response.success) {
            showToast({
              type: 'success',
              message: `Xóa thương hiệu [${name}] thành công`
            })
            setReloadData(true)
          } else {
            showAlert({
              subject: `Xóa thương hiệu ${name} thất bại`,
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
    fetchData(query)
  }, [query])

  useEffect(() => {
    if (!showModal) {
      setSelected('')
    }
  }, [showModal])

  useEffect(() => {
    if (reloadData) {
      setLimit(10)
      setPage(1)
      setSearch({ keyword: '' })
      fetchData({ limit: 10, page: 1 })
      setReloadData(false)
    }
  }, [reloadData])

  return (
    <>
      <Card>
        <CardHeader title={'Danh sách thương hiệu'}>
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
                      <td className='px-6 py-4'>{el?.title}</td>
                      <td className='px-6 py-4'>{el?.slug}</td>
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
      <Modal showModal={showModal} size={'sm'}>
        <Modal.Header
          setShowModal={setShowModal}
          color={selected ? 'secondary' : 'primary'}
        >
          {selected ? 'Cập nhập thương hiệu' : 'Thêm thương hiệu'}
        </Modal.Header>
        <Modal.Body>
          <FormBrand
            onSubmit={onSubmit}
            showModal={showModal}
            setShowModal={setShowModal}
            setOnSubmit={setOnSubmit}
            setReloadData={setReloadData}
            selected={selected}
            setSelected={setSelected}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className='flex gap-2 justify-end items-center w-full'>
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
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BrandAdmin
