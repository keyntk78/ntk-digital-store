const UserRegisterLogModel = require('~/models/user_register_log.model')

class UserRegisterLogService {
  static save = async ({
    email,
    password,
    firstname,
    lastname,
    mobile,
    token
  }) => {
    try {
      const filter = { email: email }
      const update = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        token: token,
        timeExpires: new Date(Date.now() + 10 * 60000) // Cập nhật lại thời gian sống sau 2 phút
      }
      const options = { upsert: true, new: true }

      // Thực hiện tìm kiếm hoặc cập nhật
      let user = await UserRegisterLogModel.findOneAndUpdate(
        filter,
        update,
        options
      )
      return user
    } catch (error) {
      return error
    }
  }

  static findByToken = async (token) => {
    const currentTime = new Date()
    return await UserRegisterLogModel.findOne({
      token: token,
      timeExpires: { $gt: currentTime } // Chỉ lấy các bản ghi có thời gian hết hạn lớn hơn thời gian hiện tại
    }).lean()
  }

  static removeTokenById = async (id) => {
    return await UserRegisterLogModel.deleteOne({ _id: id })
  }
}
module.exports = UserRegisterLogService
