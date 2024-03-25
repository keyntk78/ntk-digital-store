const { BadRequestError, NotFoundError } = require('~/helpers/ErrorResponse')
const Product = require('~/models/product.model')
const { changeToSlug } = require('~/utils/stringUtils')
const {
  uploadImageFromLocal,
  uploadImageFromLocalFiles
} = require('./upload.service')
const ProductCategoryService = require('./ProductCategoryService')

class ProductService {
  constructor(t) {
    this.t = t
  }
  static getProducts = async (query) => {
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

    // // Tạo điều kiện tìm kiếm cho trường title nếu có
    // if (query?.title) {
    //   filters.push({ title: { $regex: query.title, $options: 'i' } })
    // }

    // Tạo điều kiện tìm kiếm cho các trường title, brand, và category nếu có keyword
    if (query?.keyword) {
      const keywordRegex = { $regex: query.keyword, $options: 'i' }
      filters.push({
        $or: [
          { title: keywordRegex },
          { brand: keywordRegex },
          { category: keywordRegex }
        ]
      })
      // // Gán filters vào formattedQueries.$and nếu có ít nhất một điều kiện tìm kiếm
      if (filters.length > 0) {
        fortmatedQueries.$and = filters
      }
    }
    let queryCommand = Product.find(fortmatedQueries)

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
    const page = query.page || 1
    const limit = query.limit || process.env.LIMIT_PAGINATION
    const skip = (page - 1) * limit
    queryCommand = queryCommand.skip(skip).limit(limit)

    var results = await queryCommand.exec()
    const counts = await Product.find(fortmatedQueries).countDocuments()
    if (!results) {
      throw new BadRequestError()
    }

    return { data: results, counts }
  }

  create = async ({
    title,
    sortDescription,
    description,
    brand,
    price,
    category,
    quantity,
    thumb,
    images
  }) => {
    //Check arealy title
    const slug = changeToSlug(title)
    const product = await Product.findOne({ slug }).lean()
    if (product) {
      throw new BadRequestError({
        message: 'Product has existed',
        langMessage: this.t('PRODUCT_EXISTED')
      })
    }

    const urlThumb = await uploadImageFromLocal({ path: thumb })
    if (!urlThumb) {
      throw new BadRequestError({
        message: 'Upload Failed'
      })
    }
    const urlImages = await uploadImageFromLocalFiles({ files: images })

    const newPC = await Product.create({
      title,
      sortDescription,
      description,
      brand,
      slug,
      price,
      category,
      quantity,
      thumb: urlThumb,
      images: urlImages
    })
    return { data: newPC }
  }

  static getById = async ({ pid }) => {
    const product = await Product.findById(pid)
    if (product) {
      return { data: product }
    } else {
      throw new NotFoundError('Product not found')
    }
  }

  delete = async ({ pid }) => {
    //Check arealy title
    const product = await Product.findById(pid).lean()
    if (!product) {
      throw new BadRequestError({
        message: 'Product not found',
        langMessage: this.t('PRODUCT_NOT_FOUND')
      })
    }
    const deletedProduct = await Product.findByIdAndDelete(pid)

    return { data: deletedProduct }
  }

  update = async (
    { pid },
    {
      title,
      sortDescription,
      description,
      brand,
      price,
      category,
      quantity,
      thumb,
      images,
      pathImagesDefault
    }
  ) => {
    //Check arealy title
    const existingProduct = await Product.findById(pid).lean()
    if (!existingProduct) {
      throw new BadRequestError({
        message: 'Product not found',
        langMessage: this.t('PRODUCT_NOT_FOUND')
      })
    }

    const slug = changeToSlug(title)
    const existingPCWithSameTitle = await Product.findOne({
      slug,
      _id: { $ne: pid }
    }).lean()
    if (existingPCWithSameTitle) {
      throw new BadRequestError({
        message: 'Product has existed',
        langMessage: this.t('PRODUCT_EXISTED')
      })
    }

    let updatedProduct = { ...existingProduct }
    if (thumb) {
      const urlThumb = await uploadImageFromLocal({ path: thumb })
      if (!urlThumb) {
        throw new BadRequestError({
          message: 'Upload Failed'
        })
      }
      updatedProduct.thumb = urlThumb
    }
    let uploadImages = pathImagesDefault ? pathImagesDefault : []
    if (images && images.length > 0) {
      const urlImages = await uploadImageFromLocalFiles({ files: images })
      uploadImages.push(...urlImages)
    }
    updatedProduct.images = uploadImages

    //sau đó cập nhật
    // Cập nhật các trường thông tin khác
    updatedProduct.title = title
    updatedProduct.sortDescription = sortDescription
    updatedProduct.description = description
    updatedProduct.brand = brand
    updatedProduct.price = price
    updatedProduct.category = category
    updatedProduct.quantity = quantity

    // Lưu thông tin sản phẩm đã cập nhật
    const savedProduct = await Product.findByIdAndUpdate(pid, updatedProduct, {
      new: true
    })

    return { data: savedProduct }
  }
  //GETBYID
  static getProduct = async (pid) => {
    const product = await Product.findById(pid)
    // return res.status(200).json({
    //   success: product ? true : false,
    //   metadata: product ? product : 'Cannot get product'
    // })
  }

  static getByDetail = async ({ slug }) => {
    console.log(slug)
    const product = await Product.findOne({ slug: slug })
    if (product) {
      const category = await ProductCategoryService.getByTitle(product.category)
      return { data: { product, category } }
    } else {
      throw new NotFoundError('Product not found')
    }
  }
}
module.exports = ProductService
