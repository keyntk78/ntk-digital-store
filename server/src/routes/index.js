import express from 'express'
import authRouter from './v1/auth.router'
import productCategoryRouter from './v1/product_category.router'
import productRouter from './v1/product.router'
import brandRouter from './v1/brand.router'
import appRouter from './v1/app.router'

// import publishRouter from './v1/publish.router'

import { apiKey, permission } from '~/middlewares/checkAuth'
import { asyncHander } from '~/helpers/asyncHander'
import { uploadDisk } from '~/configs/multer.config'
const router = express.Router()

//check apikey
router.use(apiKey)
//check permissions
router.use(permission('0000'))

router.use('/v1/api/auth', authRouter)
router.use('/v1/api/app', appRouter)

router.use('/v1/api/auth', authRouter)
router.use('/v1/api/productcategory', productCategoryRouter)
router.use('/v1/api/product', productRouter)
router.use('/v1/api/brand', brandRouter)

module.exports = router
