import express from 'express'
import authController from '~/controllers/auth.controller'
import { asyncHander } from '~/helpers/asyncHander'
import { verifyAccessToken } from '~/middlewares/jwt'
import {
  validateLogin,
  validateRegister
} from '~/validations/auth/auth.validation' // Đảm bảo đường dẫn đúng đến file validation

const router = express.Router()

router.post('/login', validateLogin, asyncHander(authController.login))
router.post('/register', validateRegister, asyncHander(authController.register))

router.get('/logout', verifyAccessToken, asyncHander(authController.logout))
router.get('/test/:token', asyncHander(authController.test))
router.get('/final-register/:token', asyncHander(authController.finalRegister))
module.exports = router
