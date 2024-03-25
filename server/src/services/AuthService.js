const { BadRequestError, NotFoundError } = require('~/helpers/ErrorResponse')
const UserService = require('./UserService')
const { generateRandomHex } = require('~/utils/stringUtils')
const KeyTokenService = require('./KeyTokenService')
const { getInfoData } = require('~/utils/objectUtils')
const bcrypt = require('bcrypt')
const { createTokenPair } = require('~/middlewares/jwt')
const userModel = require('~/models/user.model')
const UserRegisterLogService = require('~/services/UserRegisterLogService')
const sendMail = require('~/providers/sendMail')
const { templateSendMail } = require('~/utils/contant')

class AuthService {
  constructor(t) {
    this.t = t
  }

  /*
      1. check email in dbs
      2. match password
      3. create AT và RT and save
      4. genarate token
      5. save token in dbs
      6. get data return login

   */
  login = async ({ email, password }) => {
    // 1. check email in dbs
    const foundUser = await UserService.findByEmail({ email })
    if (!foundUser)
      throw new BadRequestError({
        message: 'Account or password is incorrect',
        langMessage: this.t('ACCOUNT_PASSWORD_INCORRECT')
      })

    // 2. match password
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
      throw new BadRequestError({
        message: 'Account or password is incorrect',
        langMessage: this.t('ACCOUNT_PASSWORD_INCORRECT')
      })

    //3. create AT và RT and save
    const privateKey = generateRandomHex()
    const publicKey = generateRandomHex()

    //4. genarate token
    const tokens = await createTokenPair(
      {
        userId: foundUser._id,
        email,
        roles: foundUser.roles
      },
      publicKey,
      privateKey
    )

    // 5. save token in dbs
    await KeyTokenService.createToken({
      userId: foundUser._id,
      email,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey
    })

    //6. get data return login
    return {
      data: {
        user: getInfoData({
          fileds: ['_id', 'name', 'email', 'firstname', 'lastname'],
          object: foundUser
        }),
        accessToken: tokens.accessToken
      },
      refreshToken: tokens.refreshToken
    }
  }

  test = async ({ token }) => {
    throw new BadRequestError({
      message: 'Account or password is incorrect',
      langMessage: this.t('ACCOUNT_PASSWORD_INCORRECT')
    })
  }
  finalRegister = async ({ token }) => {
    // Check
    const log = await UserRegisterLogService.findByToken(token)
    if (!log) {
      throw new BadRequestError({
        message: 'Register failed',
        langMessage: this.t('REGISTER_FAILED')
      })
    }

    // //save user
    const newUser = await userModel.create({
      email: log.email,
      password: log.password,
      firstname: log.firstname,
      lastname: log.lastname,
      mobile: log.mobile
    })

    if (newUser) {
      await UserRegisterLogService.removeTokenById({ _id: log._id })
      return true
    }

    throw new BadRequestError({
      message: 'Register failed',
      langMessage: this.t('REGISTER_FAILED')
    })
  }

  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeTokenById(keyStore._id)
    return delKey
  }

  register = async ({ email, password, firstname, lastname, mobile }) => {
    //check user arealdy
    const user = await userModel.findOne({ $or: [{ email }, { mobile }] })
    if (user)
      throw new BadRequestError({
        message: 'User has existed',
        langMessage: this.t('USER_EXISTED')
      })
    else {
      //SAVE OTP
      const token = generateRandomHex()
      const currentTime = new Date()
      const expirationTime = new Date(
        currentTime.getTime() + 10 * 60000
      ).toString()

      const salt = bcrypt.genSaltSync(10)
      password = await bcrypt.hash(password, salt)

      const saveLog = await UserRegisterLogService.save({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        token: token,
        timeExpires: expirationTime
      })

      if (saveLog) {
        // const html = `Xin vui lòng click vào link dưới đây để hoàn tất đăng ký. Link này sẽ hết hạn sau 10 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/hoan-tat-dang-ky/${token}>Vào đây</a>`
        //send mail
        const html = templateSendMail.SEND_REGISTER.replace(
          '{0}',
          `${firstname} ${lastname}`
        ) // Thay thế tên người dùng với dữ liệu thực tế
          .replace('{1}', `${process.env.CLIENT_URL}/hoan-tat-dang-ky/${token}`) // Thay thế URL với dữ liệu thực tế

        const data = { email: email, subject: 'Hoàn tất đăng ký', html: html }
        const rs = await sendMail(data)
        return true
      }

      throw new BadRequestError({
        message: 'Register failed',
        langMessage: this.t('REGISTER_FAILED')
      })
    }
  }
}
module.exports = AuthService
