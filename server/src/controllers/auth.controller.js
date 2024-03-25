const AuthService = require('~/services/AuthService')
const { OK } = require('~/helpers/SuccessResponse')
const { BadRequestError } = require('~/helpers/ErrorResponse')

const login = async (req, res) => {
  const authService = new AuthService(req.t)
  const response = await authService.login(req.body)
  // Lưu refresh token vào cookie
  res.cookie('refreshToken', response.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  new OK({
    message: 'Login successfully',
    metadata: response.data,
    langMessage: req.t('LOGIN_SUCCESS')
  }).send(res)
}

const test = async (req, res) => {
  const authService = new AuthService(req.t)
  const response = await authService.test(req.params)

  new OK({
    message: 'Login successfully',
    metadata: response.data,
    langMessage: req.t('LOGIN_SUCCESS')
  }).send(res)
}

const finalRegister = async (req, res, next) => {
  const authService = new AuthService(req.t)
  await authService.finalRegister(req.params)
  new OK({
    message: 'Register successfully',
    langMessage: req.t('REGISTER_SUCCESS')
  }).send(res)
}

const logout = async (req, res, next) => {
  const cookie = req.cookies
  if (!cookie || !cookie.refreshToken)
    throw new BadRequestError({ message: 'No refresh token in cookies' })

  await AuthService.logout(req.keyStore)

  // Xóa refresh token ở cookie trình duyệt
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true
  })
  new OK({
    message: 'Logout successfully',
    langMessage: req.t('LOGOUT_SUCCESS')
  }).send(res)
}

const register = async (req, res, next) => {
  const authService = new AuthService(req.t)
  await authService.register(req.body)

  new OK({
    message: 'Register successfully.Please check email.',
    langMessage: req.t('REGISTER_SUCCESS')
  }).send(res)
}

module.exports = { login, logout, register, finalRegister, test }
