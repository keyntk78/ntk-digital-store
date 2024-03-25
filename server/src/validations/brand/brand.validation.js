const Joi = require('joi')
const { VaidateRequestError } = require('~/helpers/ErrorResponse')

//Login
const validateCreateAndUpdateBrand = (req, res, next) => {
  const brandSchema = Joi.object({
    title: Joi.string().required()
  })

  const { error } = brandSchema.validate(req.body)
  if (error) {
    throw new VaidateRequestError(error.details[0].message)
  }
  next()
}

module.exports = { validateCreateAndUpdateBrand }
