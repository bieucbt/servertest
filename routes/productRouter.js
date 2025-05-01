const express = require('express')
const { getAllProducts, createProduct, deleteProduct, getOneProduct,
    updateProduct, updateCartQuantity
} = require('../controller/productController')
const router = express()
const upload = require('../middleware/uploadMiddleware')

router.get('/', getAllProducts)
router.post('/', upload.single('img'), createProduct);

router.patch('/updateQuantity', updateCartQuantity)

router.get('/:id', getOneProduct)
router.patch('/:id', upload.single('img'), updateProduct);
router.delete('/:id', deleteProduct)



module.exports = router