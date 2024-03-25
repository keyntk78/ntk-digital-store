import axios from '../axios'
export const apiGetCategoreis = (params) =>
  axios({ url: '/productcategory/', method: 'GET', params: params })

export const apiCreateProductCategory = (data) =>
  axios({
    url: '/productcategory/',
    method: 'POST',
    data,
    isFormData: true
  })

export const apiGetByIdProductCategory = (bid) =>
  axios({ url: `/productcategory/${bid}`, method: 'GET' })

export const apiUpdateProductCategory = (bid, data) =>
  axios({
    url: `/productcategory/${bid}`,
    method: 'PUT',
    data,
    isFormData: true
  })

export const apiDeleteProductCategory = (bid) =>
  axios({ url: `/productcategory/${bid}`, method: 'DELETE' })
