import express from 'express'
import authController from '~/controllers/auth.controller'
const router = express.Router()

router.get('/auth/final-register/:token', authController.finalRegister)

module.exports = router
