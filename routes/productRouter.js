const express = require('express')
const { getAllProducts, createProduct } = require('../controller/productController')
const router = express()
const upload = require('../middleware/uploadMiddleware')

router.get('/', getAllProducts)

// Áp dụng middleware Multer
router.post('/', upload.single('img'), createProduct);

module.exports = router