const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  img: {type: String, require: true},
  name: {type: String, require: true},
  price: {type: Number, require: true},
  count: {type: Number, require: true},
  size: {type: String},
  color: {type: String},
  description: {type: String},
  category: {type: String},
  productType: {type: String}
}) 

module.exports = mongoose.model('product', productSchema)