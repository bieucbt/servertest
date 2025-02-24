const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, select: false },
  isAdmin: { type: Boolean, default: false },
  cart: { type: String }
})

module.exports = mongoose.model('User', userSchema)