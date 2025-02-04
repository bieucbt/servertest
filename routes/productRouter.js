const express = require('express')
const { getAllProducts, createProduct, deleteProduct, getOneProduct,
    updateProduct
} = require('../controller/productController')
const router = express()
const upload = require('../middleware/uploadMiddleware')

router.get('/', getAllProducts)

router.get('/:id', getOneProduct)

router.post('/', upload.single('img'), createProduct);

router.patch('/:id', upload.single('img'), updateProduct);

router.delete('/:id', deleteProduct)

module.exports = router