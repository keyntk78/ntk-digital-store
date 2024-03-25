const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')

// Declare the Schema of the Mongo model
const userRegisterLogSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },

  timeExpires: {
    type: Date,
    required: true,
    default: function () {
      return new Date(Date.now() + 10 * 60000) // 2 phút
    }
  }
})

//Export the model
module.exports = mongoose.model('UserRegisterLog', userRegisterLogSchema)
