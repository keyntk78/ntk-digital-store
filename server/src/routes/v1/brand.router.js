import express from 'express'
import ctrl from '~/controllers/brand.controller'
import { asyncHander } from '~/helpers/asyncHander'
import { validateCreateAndUpdateBrand } from '~/validations/brand/brand.validation'

const router = express.Router()

router.get('/', asyncHander(ctrl.getAll))
router.post('/', validateCreateAndUpdateBrand, asyncHander(ctrl.create))
router.delete('/:bid', asyncHander(ctrl.deleted))
router.put('/:bid', validateCreateAndUpdateBrand, asyncHander(ctrl.update))
router.get('/:bid', asyncHander(ctrl.getById))

module.exports = router
