const productModels = require("../models/productModels")


const getAllProducts = async (req, res) => {
  try {
    const products = await productModels.find({})
    res.status(200).json(products)
  } catch (err) {
    res.status(404).json({ mess: 'không có sản phẩm nào' })
  }
}

const createProduct = async (req, res) => {
  try {
    const product = await productModels.create({ ...req.body, img: req.file.filename })
    res.status(200).json(product)
  } catch (err) {
    res.status(401).json({ message: 'Thêm sản phẩm thất bại' })
  }
}


module.exports = {
  getAllProducts,
  createProduct
}