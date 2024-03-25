import axios from '../axios'

export const apiGetProducts = (params) =>
  axios({ url: '/product/', method: 'GET', params: params })

export const apiCreateProduct = (data) =>
  axios({
    url: '/product/',
    method: 'POST',
    data,
    isFormData: true
  })

export const apiDeleteProduct = (pid) =>
  axios({ url: `/product/${pid}`, method: 'DELETE' })

export const apiUpdateProduct = (pid, data) =>
  axios({
    url: `/product/${pid}`,
    method: 'PUT',
    data,
    isFormData: true
  })

export const apiGetByIdProduct = (pid) =>
  axios({ url: `/product/${pid}`, method: 'GET' })

export const apiGetByDetailProduct = (pid) =>
  axios({ url: `/product/detail/${pid}`, method: 'GET' })
