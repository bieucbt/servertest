const orderModel = require('../models/orderModel')


const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ createdAt: -1 })
        res.status(200).json(orders)
    } catch (err) {
        res.status(400).json({ mess: err.message })
    }
}

const createOrder = async (req, res) => {
    const data = req.body
    try {
        const result = await orderModel.create({ ...data })
        return res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ mess: err.message })
    }
}

const getOrdersByUserId = async (req, res) => {
    const id = req.params.id

    try {
        if (!id) return res.status(404).json({ messsage: 'id không tồn tại' })
        const orders = await orderModel.find({ idUser: id })
        return res.status(200).json(orders)
    } catch (err) {
        return res.status(400).json({ messsage: err.message })
    }
}

const deleteOrder = async (req, res) => {
    const id = req.params.id
    try {
        if (!id) return res.status(400).json({ mess: 'id đơn hàng không hợp lệ' })
        const order = await orderModel.findByIdAndDelete(id)
        if (!order) return res.status(400).json({ mess: 'xóa đơn hàng thất bại' })
        return res.status(200).json(order)

    } catch (err) {
        return res.status((404)).json({ mess: err.response })
    }
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrdersByUserId,
    deleteOrder
}