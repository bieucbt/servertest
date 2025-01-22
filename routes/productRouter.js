const express = require('express')
const { getAllProducts} = require('../controller/productController')
const router = express()
const upload = require('../middleware/uploadMiddleware')


router.get('/', getAllProducts)

// Áp dụng middleware Multer
router.post('/', upload.single('imgProduct'), (req, res) => {
  res.status(201).json({body: {...req.body}, upload: req.file})
});

module.exports = router