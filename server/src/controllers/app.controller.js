const { OK } = require('~/helpers/SuccessResponse')
const { uploadImageFromLocal } = require('~/services/upload.service')

const upload = async (req, res) => {
  const { file } = req

  const response = await uploadImageFromLocal({ path: file.path })

  new OK({
    metadata: response
  }).send(res)
}

module.exports = {
  upload
}
