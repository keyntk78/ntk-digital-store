import axios from '../axios'
export const apiGetBrands = (params) =>
  axios({ url: '/brand/', method: 'GET', params: params })

export const apiCreateBrand = (data) =>
  axios({ url: '/brand/', method: 'POST', data })

export const apiGetByIdBrand = (bid) =>
  axios({ url: `/brand/${bid}`, method: 'GET' })

export const apiUpdateBrand = (bid, data) =>
  axios({ url: `/brand/${bid}`, method: 'PUT', data })

export const apiDeleteBrand = (bid) =>
  axios({ url: `/brand/${bid}`, method: 'DELETE' })
