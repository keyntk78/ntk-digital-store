const { OK } = require('~/helpers/SuccessResponse')
const ProductCategoryService = require('~/services/ProductCategoryService')

const getProductCategories = async (req, res) => {
  const response = await ProductCategoryService.getProductCategories(req.query)
  new OK({
    metadata: response
  }).send(res)
}

const create = async (req, res) => {
  const { file } = req
  if (file) {
    req.body.thumb = file.path
  }

  const productCategoryService = new ProductCategoryService(req.t)
  const response = await productCategoryService.create(req.body)
  new OK({
    metadata: response
  }).send(res)
}

const deleted = async (req, res) => {
  const productCategoryService = new ProductCategoryService(req.t)
  const response = await productCategoryService.delete(req.params)
  new OK({
    metadata: response
  }).send(res)
}

const getById = async (req, res) => {
  const response = await ProductCategoryService.getById(req.params)
  new OK({
    metadata: response
  }).send(res)
}

const update = async (req, res) => {
  const { file } = req

  if (file) {
    req.body.thumb = file.path
  }
  const productCategoryService = new ProductCategoryService(req.t)
  const response = await productCategoryService.update(req.params, req.body)
  new OK({
    metadata: response
  }).send(res)
}

module.exports = {
  getProductCategories,
  create,
  deleted,
  getById,
  update
}
