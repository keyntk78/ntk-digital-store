const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    thumb: {
      type: String
    },
    position: {
      type: Number,
      default: 1
    },
    parentId: {
      type: String
    },
    brand: {
      type: Array
    }
  },
  { timestamps: true }
)

//Export the model
module.exports = mongoose.model('ProductCategory', productCategorySchema)
