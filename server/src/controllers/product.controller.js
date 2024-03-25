const { OK } = require('~/helpers/SuccessResponse')
const ProductService = require('~/services/ProductService')
const {
  uploadImageFromLocal,
  uploadImageFromLocalFiles
} = require('~/services/upload.service')

const getProducts = async (req, res) => {
  const response = await ProductService.getProducts(req.query)
  new OK({
    metadata: response
  }).send(res)
}

const create = async (req, res) => {
  console.log(req.body)
  const { files } = req
  const { file } = req
  if (files['file'][0]) {
    req.body.thumb = files['file'][0].path
  }
  if (files['files']) {
    req.body.images = files['files']
  }
  const productService = new ProductService(req.t)
  const response = await productService.create(req.body)
  // const productCategoryService = new ProductCategoryService(req.t)
  // const response = await productCategoryService.create(req.file, req.body)
  new OK({
    metadata: response
  }).send(res)
}

const create2 = async (req, res) => {
  const { files } = req
  if (files) {
    if (files['file']) {
      req.body.thumb = files['file'][0].path
    }
    if (files['files']) {
      req.body.images = files['files']
    }
  }

  const productService = new ProductService(req.t)
  const response = await productService.create(req.body)
  // const productCategoryService = new ProductCategoryService(req.t)
  // const response = await productCategoryService.create(req.file, req.body)
  new OK({
    metadata: response
  }).send(res)
}

const getById = async (req, res) => {
  const response = await ProductService.getById(req.params)
  new OK({
    metadata: response
  }).send(res)
}

const deleted = async (req, res) => {
  const productService = new ProductService(req.t)
  const response = await productService.delete(req.params)
  new OK({
    metadata: response
  }).send(res)
}

const update = async (req, res) => {
  const { files } = req
  if (files) {
    if (files['file']) {
      req.body.thumb = files['file'][0].path
    }
    if (files['files']) {
      req.body.images = files['files']
    }
  }

  const productService = new ProductService(req.t)
  const response = await productService.update(req.params, req.body)
  new OK({
    metadata: response
  }).send(res)
}

const getByDetail = async (req, res) => {
  const response = await ProductService.getByDetail(req.params)
  new OK({
    metadata: response
  }).send(res)
}

module.exports = {
  getProducts,
  create,
  create2,
  deleted,
  getById,
  update,
  getByDetail
}
