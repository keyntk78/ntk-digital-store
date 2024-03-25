import express from 'express'
import ctrl from '~/controllers/product_category.controller'
import { asyncHander } from '~/helpers/asyncHander'
import {
  validateCreateProductCategory,
  validateUpdateProductCategory
} from '~/validations/productCategory/productCategory.validation'
import { uploadDisk } from '~/configs/multer.config'

const router = express.Router()

router.get('/', asyncHander(ctrl.getProductCategories))
router.post(
  '/',
  uploadDisk.single('file'),
  validateCreateProductCategory,
  asyncHander(ctrl.create)
)

router.delete('/:bid', asyncHander(ctrl.deleted))
router.put(
  '/:bid',
  uploadDisk.single('file'),
  validateUpdateProductCategory,
  asyncHander(ctrl.update)
)
router.get('/:bid', asyncHander(ctrl.getById))

module.exports = router
//  validateCreateProductCategory,
//   fileUploader.single('file'),
