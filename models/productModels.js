const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  imgs: [String],
  name: {type: String, require: true},
  price: {type: Number, require: true},
  count: {type: Number, require: true},
  size: [String],
  color: [String],
  description: {type: String}
})

module.exports = mongoose.model('product', productSchema)