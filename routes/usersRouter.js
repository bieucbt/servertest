const express = require('express');
const { createUser, getAllUsers, deleteUser, login, getOneUser, editUser } = require('../controller/userController');
const router = express.Router()


router.post('/login', login);
router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.delete('/:id', deleteUser);
router.post('/signup', createUser);
router.patch('/editUser/:id', editUser);

module.exports = router