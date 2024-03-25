const apikeyModel = require('~/models/apikey.model')

class ApikeyService {
  static findByKey = async (key) => {
    const objectKey = await apikeyModel.findOne({ key, status: true }).lean()
    return objectKey
  }
}
module.exports = ApikeyService
