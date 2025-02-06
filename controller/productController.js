const productModels = require("../models/productModels")


const getAllProducts = async (req, res) => {
  try {
    const products = await productModels.find({})
    res.status(200).json(products)
  } catch (err) {
    res.status(404).json({ mess: 'không có sản phẩm nào' })
  }
}

const getOneProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await productModels.findById(id)
    return res.status(200).json(product)
  } catch (err) {
    return res.status(404).json({ message: 'không tìm thấy sản phẩm' })
  }
}

const createProduct = async (req, res) => {
  try {
    // const product = await productModels.create({ ...req.body, img: req.file.filename })
    res.status(200).json({ ...req.body, img: req.file.filename })
  } catch (err) {
    res.status(401).json({ message: 'Thêm sản phẩm thất bại' })
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await productModels.findByIdAndDelete(id)
    return res.status(204).json(product)
  } catch (err) {
    return res.status(400).json({ message: err })
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  try {
    if (req.file) {
      const product = await productModels.findByIdAndUpdate(id, { ...req.body, img: req.file.filename })
      return res.status(200).json({ ...req.body, img: req.file.filename })
    }
    else {
      const product = await productModels.findByIdAndUpdate(id, { ...req.body, img: req.body.img2 })
      return res.status(200).json(product)
    }
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  getOneProduct,
  updateProduct
}