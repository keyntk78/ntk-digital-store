const keyTokenModel = require('~/models/keyToken.model')

class KeyTokenService {
  static createToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken
  }) => {
    try {
      const filter = {
          user: userId
        },
        update = {
          publicKey: publicKey,
          privateKey: privateKey,
          refreshTokensUsed: [],
          refreshToken
        },
        options = { upsert: true, new: true }
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      )
      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: userId }).lean()
  }

  static removeTokenById = async (id) => {
    return await keyTokenModel.deleteOne({ _id: id })
  }
}
module.exports = KeyTokenService
