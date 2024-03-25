import express from 'express'
import { uploadDisk } from '~/configs/multer.config'
import ctrl from '~/controllers/product.controller'
import { asyncHander } from '~/helpers/asyncHander'
import {
  validateCreateProduct,
  validateUpdateProduct
} from '~/validations/product/product.validation'

const router = express.Router()

router.get('/', asyncHander(ctrl.getProducts))
router.post(
  '/',
  uploadDisk.fields([
    { name: 'file', maxCount: 1 },
    { name: 'files', maxCount: 8 }
  ]),
  validateCreateProduct,
  asyncHander(ctrl.create2)
)
router.get('/detail/:slug', asyncHander(ctrl.getByDetail))

router.put(
  '/:pid',
  uploadDisk.fields([
    { name: 'file', maxCount: 1 },
    { name: 'files', maxCount: 8 }
  ]),
  validateUpdateProduct,
  asyncHander(ctrl.update)
)

router.get('/:pid', asyncHander(ctrl.getById))

router.delete('/:pid', asyncHander(ctrl.deleted))

module.exports = router
