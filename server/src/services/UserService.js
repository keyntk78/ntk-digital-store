const userModel = require('~/models/user.model')

class UserService {
  static findByEmail = async ({
    email,
    select = {
      email: 1,
      password: 1,
      firstname: 1,
      lastname: 1,
      roles: 1,
      isBlocked: 1
    }
  }) => {
    return await userModel.findOne({ email }).select(select).lean()
  }
}
module.exports = UserService
