const { BadRequestError, NotFoundError } = require('~/helpers/ErrorResponse')
const brandModel = require('~/models/brand.model')
const { changeToSlug } = require('~/utils/stringUtils')

class BrandsService {
  constructor(t) {
    this.t = t
  }

  create = async ({ title }) => {
    //Check arealy title
    const slug = changeToSlug(title)
    const brand = await brandModel.findOne({ slug }).lean()
    if (brand) {
      throw new BadRequestError({
        message: 'Brand has existed',
        langMessage: this.t('BRAND_EXISTED')
      })
    }

    const newBrand = await brandModel.create({
      title,
      slug: slug
    })

    return { data: newBrand }
  }

  static getAll = async (query) => {
    const queies = { ...query }
    //tách các trường đặt biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields', 'keyword']
    excludeFields.forEach((field) => delete queies[field])

    // //Format lại các operator cho đúng cú pháp moongo
    let queryString = JSON.stringify(queies)
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matches) => `$${matches}`
    )

    const fortmatedQueries = JSON.parse(queryString)
    // Khởi tạo đối tượng filters
    const filters = []

    // Tạo điều kiện tìm kiếm cho các trường title, brand, và category nếu có keyword
    if (query?.keyword) {
      const keywordRegex = { $regex: query.keyword, $options: 'i' }
      filters.push({
        $or: [{ title: keywordRegex }]
      })
      // // Gán filters vào formattedQueries.$and nếu có ít nhất một điều kiện tìm kiếm
      if (filters.length > 0) {
        fortmatedQueries.$and = filters
      }
    }
    let queryCommand = brandModel.find(fortmatedQueries)

    //Sorting
    if (query.sort) {
      const sortBy = query.sort.split(',').join(' ')
      queryCommand = queryCommand.sort(sortBy)
    }

    //Field limiting
    if (query.fields) {
      const fields = query.fields.split(',').join(' ')
      queryCommand = queryCommand.select(fields)
    }
    //pagination
    if (query.limit != -1) {
      const page = query.page || 1
      const limit = query.limit || process.env.LIMIT_PAGINATION
      const skip = (page - 1) * limit
      queryCommand = queryCommand.skip(skip).limit(limit)
    }

    var results = await queryCommand.exec()
    const counts = await brandModel.find(fortmatedQueries).countDocuments()
    if (!results) {
      throw new BadRequestError()
    }

    return { data: results, counts }
  }

  static getById = async ({ bid }) => {
    const brand = await brandModel.findById(bid)
    if (brand) {
      return { data: brand }
    } else {
      throw new NotFoundError('Brand not found')
    }
  }

  update = async ({ bid }, { title }) => {
    //Check arealy title
    const brand = await brandModel.findById(bid).lean()
    // const brand = await brandModel.findOne({ slug }).lean()
    if (!brand) {
      throw new BadRequestError({
        message: 'Brand not found',
        langMessage: this.t('BRAND_NOT_FOUND')
      })
    }

    const slug = changeToSlug(title)
    const existingBrandWithSameTitle = await brandModel
      .findOne({ slug, _id: { $ne: bid } })
      .lean()
    if (existingBrandWithSameTitle) {
      throw new BadRequestError({
        message: 'Brand has existed',
        langMessage: this.t('BRAND_EXISTED')
      })
    }

    const updatedbrand = await brandModel.findByIdAndUpdate(
      bid,
      {
        title,
        slug: slug
      },
      {
        new: true
      }
    )

    return { data: updatedbrand }
  }

  delete = async ({ bid }) => {
    //Check arealy title
    const brand = await brandModel.findById(bid).lean()
    // const brand = await brandModel.findOne({ slug }).lean()
    if (!brand) {
      throw new BadRequestError({
        message: 'Brand not found',
        langMessage: this.t('BRAND_NOT_FOUND')
      })
    }
    const deletedbrand = await brandModel.findByIdAndDelete(bid)

    return { data: deletedbrand }
  }
}
module.exports = BrandsService
