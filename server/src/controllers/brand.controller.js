const { OK } = require('~/helpers/SuccessResponse')
const BrandService = require('~/services/BrandService')

const create = async (req, res) => {
  const brandService = new BrandService(req.t)
  const response = await brandService.create(req.body)
  new OK({
    metadata: response
  }).send(res)
}

const update = async (req, res) => {
  const brandService = new BrandService(req.t)
  const response = await brandService.update(req.params, req.body)
  new OK({
    metadata: response
  }).send(res)
}

const deleted = async (req, res) => {
  const brandService = new BrandService(req.t)
  const response = await brandService.delete(req.params)
  new OK({
    metadata: response
  }).send(res)
}

const getAll = async (req, res) => {
  const response = await BrandService.getAll(req.query)
  new OK({
    metadata: response
  }).send(res)
}

const getById = async (req, res) => {
  const response = await BrandService.getById(req.params)
  new OK({
    metadata: response
  }).send(res)
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleted
}
