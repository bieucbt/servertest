const express = require('express')
const { getAllProducts} = require('../controller/productController')
const router = express()


router.get('/', getAllProducts)

module.exports = router