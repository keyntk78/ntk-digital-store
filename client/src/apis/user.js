import axios from '../axios'

export const apiRegister = (data) =>
  axios({ url: '/auth/register', method: 'POST', data })

export const apiLogin = (data) =>
  axios({ url: '/auth/login', method: 'POST', data })

export const apiFinnalRegister = (param) =>
  axios({ url: `/auth/final-register/${param}`, method: 'GET' })
