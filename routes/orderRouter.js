const express = require('express')
const { getAllOrders, createOrder, getOrdersByUserId,
    deleteOrder
} = require('../controller/orderController')
const router = express()


router.get('/', getAllOrders)
router.post('/', createOrder)

router.get('/:id', getOrdersByUserId)
router.post('/:id', deleteOrder)


module.exports = router