const express = require('express');
const { createUser, getAllUsers, deleteUser, login, getOneUser,
    editUser, addToCart } = require('../controller/userController');
const { authenticateToken } = require('../middleware/authenticateToken');
const router = express.Router()


router.post('/login', login);
router.get('/', getAllUsers);
router.get('/me', authenticateToken, (req, res) => {
    return res.status(200).json({ ...req.user })
})
router.get('/:id', getOneUser);
router.delete('/:id', deleteUser);
router.post('/signup', createUser);
router.patch('/editUser/:id', editUser);
router.patch('/cart', authenticateToken, addToCart)

module.exports = router
