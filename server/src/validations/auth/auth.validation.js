const Joi = require('joi')
const { VaidateRequestError } = require('~/helpers/ErrorResponse')

//Login
const validateLogin = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .trim()
      .strict()
      .required()
      .messages({
        'string.email': 'Email must be a valid email address'
      }),
    password: Joi.string().min(8).max(50).trim().strict().required()
  })

  const { error } = loginSchema.validate(req.body)
  if (error) {
    throw new VaidateRequestError(error.details[0].message)
  }
  next()
}

//register
const validateRegister = (req, res, next) => {
  const registerSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .trim()
      .strict()
      .required()
      .messages({
        'string.email': 'Email must be a valid email address'
      }),
    password: Joi.string().min(8).max(50).trim().strict().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    mobile: Joi.string().required()
  })

  const { error } = registerSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  next()
}

module.exports = { validateLogin, validateRegister }
