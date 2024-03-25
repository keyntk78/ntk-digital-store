const Joi = require('joi')
const { VaidateRequestError } = require('~/helpers/ErrorResponse')

const validateCreateProductCategory = (req, res, next) => {
  const productCategorySchema = Joi.object({
    title: Joi.string().required(),
    parentId: Joi.string().empty(''),
    brand: Joi.array().items(Joi.string()).allow(null).optional(),
    position: Joi.string()
  })

  const { error } = productCategorySchema.validate(req.body)

  // if (error) {
  //   throw new VaidateRequestError(error.details[0].message)
  // }
  next()
}

const validateUpdateProductCategory = (req, res, next) => {
  const productCategorySchema = Joi.object({
    title: Joi.string().required(),
    parentId: Joi.string().empty(''),
    brand: Joi.array().items(Joi.string()).allow(null).optional(),
    position: Joi.string()
  })

  const { error } = productCategorySchema.validate(req.body)

  if (error) {
    throw new VaidateRequestError(error.details[0].message)
  }
  next()
}
module.exports = {
  validateCreateProductCategory,
  validateUpdateProductCategory
}
