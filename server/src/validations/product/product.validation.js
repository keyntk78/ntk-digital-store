const Joi = require('joi')
const { VaidateRequestError } = require('~/helpers/ErrorResponse')

const validateCreateProduct = (req, res, next) => {
  const productSchema = Joi.object({
    title: Joi.string().required(),
    sortDescription: Joi.string().required(),
    description: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    quantity: Joi.number().required()
  })

  const { error } = productSchema.validate(req.body)

  if (error) {
    throw new VaidateRequestError(error.details[0].message)
  }

  const { files } = req

  if (!files['file']) {
    throw new VaidateRequestError('File is required')
  }

  if (!files['files']) {
    throw new VaidateRequestError('Files is required')
  }

  next()
}

const validateUpdateProduct = (req, res, next) => {
  const productSchema = Joi.object({
    title: Joi.string().required(),
    sortDescription: Joi.string(),
    description: Joi.string(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    quantity: Joi.number().required(),
    pathImagesDefault: Joi.array().items(Joi.string()).allow(null).optional()
  })

  const { error } = productSchema.validate(req.body)

  if (error) {
    throw new VaidateRequestError(error.details[0].message)
  }

  next()
}

module.exports = { validateCreateProduct, validateUpdateProduct }
