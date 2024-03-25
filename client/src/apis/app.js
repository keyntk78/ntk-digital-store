import axios from '../axios'

export const apiGetCategoreis = (params) =>
  axios({
    url: '/productcategory/',
    method: 'GET',
    params: params
  })

export const apiUpload = (data) =>
  axios({
    url: '/app/upload',
    method: 'POST',
    data,
    isFormData: true
  })
