const { handleUpload } = require('~/configs/cloudinary.config')
const { BadRequestError, NotFoundError } = require('~/helpers/ErrorResponse')
const ProductCategory = require('~/models/product_category.model')
const { changeToSlug } = require('~/utils/stringUtils')
const { uploadImageFromLocal } = require('./upload.service')

class ProductCategoryService {
  constructor(t) {
    this.t = t
  }

  static getProductCategories = async (query) => {
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

    //Filtering
    const filters = []
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

    let queryCommand = ProductCategory.find(fortmatedQueries)

    //Sorting
    if (query?.sort) {
      const sortBy = query.sort.split(',').join(' ')
      queryCommand = queryCommand.sort(sortBy)
    }

    //Field limiting
    if (query.fields) {
      const fields = query.fields.split(',').join(' ')
      queryCommand = queryCommand.select(fields)
    }
    //pagination
    //pagination
    if (query.limit != -1) {
      const page = query.page || 1
      const limit = query.limit || process.env.LIMIT_PAGINATION
      const skip = (page - 1) * limit
      queryCommand = queryCommand.skip(skip).limit(limit)
    }

    var results = await queryCommand.exec()
    const counts = await ProductCategory.find(fortmatedQueries).countDocuments()
    return { data: results, counts }
  }

  create = async ({ title, brand, position, thumb, parentId }) => {
    //Check arealy title
    const slug = changeToSlug(title)
    const productCategory = await ProductCategory.findOne({ slug }).lean()
    if (productCategory) {
      throw new BadRequestError({
        message: 'Product classategory has existed',
        langMessage: this.t('PRODUCTCATEGORY_EXISTED')
      })
    }
    let url = ''
    console.log(thumb)
    if (thumb) {
      url = await uploadImageFromLocal({ path: thumb })
      if (!url) {
        throw new BadRequestError({
          message: 'Upload Failed'
        })
      }
    }

    const newPC = await ProductCategory.create({
      title,
      brand,
      thumb: url,
      position,
      slug,
      parentId
    })
    return { data: newPC }
  }

  static getById = async ({ bid }) => {
    const pc = await ProductCategory.findById(bid)
    if (pc) {
      return { data: pc }
    } else {
      throw new NotFoundError('Product not found')
    }
  }

  delete = async ({ bid }) => {
    //Check arealy title
    const pc = await ProductCategory.findById(bid).lean()
    // const brand = await brandModel.findOne({ slug }).lean()
    if (!pc) {
      throw new BadRequestError({
        message: 'Product category not found',
        langMessage: this.t('PRODUCTCATEGORY_NOT_FOUND')
      })
    }
    const deletedPC = await ProductCategory.findByIdAndDelete(bid)

    return { data: deletedPC }
  }

  update = async ({ bid }, { title, position, brand, thumb, parentId }) => {
    //Check arealy title
    const pc = await ProductCategory.findById(bid).lean()
    if (!pc) {
      throw new BadRequestError({
        message: 'Product category not found',
        langMessage: this.t('PRODUCTCATEGORY_NOT_FOUND')
      })
    }

    const slug = changeToSlug(title)
    const existingPCWithSameTitle = await ProductCategory.findOne({
      slug,
      _id: { $ne: bid }
    }).lean()
    if (existingPCWithSameTitle) {
      throw new BadRequestError({
        message: 'Product category has existed',
        langMessage: this.t('PRODUCTCATEGORY_EXISTED')
      })
    }

    let updated

    if (thumb) {
      const url = await uploadImageFromLocal({ path: thumb })
      if (!url) {
        throw new BadRequestError({
          message: 'Upload Failed'
        })
      }
      updated = await ProductCategory.findByIdAndUpdate(
        bid,
        {
          title,
          brand,
          position,
          parentId,
          slug: slug,
          thumb: url
        },
        {
          new: true
        }
      )
    } else {
      updated = await ProductCategory.findByIdAndUpdate(
        bid,
        {
          title,
          brand,
          position,
          parentId,
          slug: slug
        },
        {
          new: true
        }
      )
    }

    return { data: updated }
  }

  static getByTitle = async (title) => {
    const pc = await ProductCategory.findOne({ title })
    // pc.parentId khác null học emty thì truy vấn lấy thêm cha theo id
    if (pc) {
      let categoryHierarchy = []
      let currentCategory = pc

      // Lặp qua tất cả các parentCategory (nếu có) và lấy thông tin của chúng
      while (currentCategory) {
        categoryHierarchy.unshift({
          title: currentCategory.title,
          slug: currentCategory.slug
        })

        // Nếu parentId không phải là null hoặc rỗng, thực hiện truy vấn để lấy thông tin của thằng cha
        if (currentCategory.parentId) {
          const parentCategory = await ProductCategory.findById(
            currentCategory.parentId
          )
          if (parentCategory) {
            currentCategory = parentCategory
          } else {
            currentCategory = null
          }
        } else {
          currentCategory = null
        }
      }

      return categoryHierarchy
    } else {
      return null
    }
  }
}
module.exports = ProductCategoryService
