const nodemailer = require('nodemailer')
const { asyncHander } = require('~/helpers/asyncHander')

const sendMail = asyncHander(async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  })

  const info = await transporter.sendMail({
    from: '"E-Shop" <no-reply@eshop.email>',
    to: email,
    subject: subject,
    html: html
  })

  return info
})

module.exports = sendMail
