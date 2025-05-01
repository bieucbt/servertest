


const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    idUser: { type: String, require: true },
    cart: { type: String, require: true },
    fullname: String,
    address: String,
    phone: String,
    status: { type: String, default: 1 }
})

module.exports = mongoose.model('order', orderSchema)