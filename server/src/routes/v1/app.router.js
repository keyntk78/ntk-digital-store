import express from 'express'
import { uploadDisk } from '~/configs/multer.config'
import ctrls from '~/controllers/app.controller'
import { asyncHander } from '~/helpers/asyncHander'

const router = express.Router()

router.post('/upload', uploadDisk.single('file'), asyncHander(ctrls.upload))

module.exports = router
