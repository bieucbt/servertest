const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const validator = require('validator')

const getAllUsers = async (req, res) => {
  try {
    const userData = await userModel.find({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(404).json({ mess: err });
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) res.status(401).json({ mess: 'Tài khoản không tồn tại' });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ mess: err });
  }
};

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    if (!validator.isEmail(email)) {
      throw new TypeError("Email không hợp lệ");
    }
    const match = await userModel.findOne({ email });
    if (match) return res.status(401).json({ message: "Email đã tồn tại" });
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.create({ email, password: hash });
    if (user)
      return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete(userId);
    res.status(204).json(user);
  } catch (err) {
    res.status(404).json({ mess: err });
  }
};

const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select("email _id isAdmin cart +password");
    if (!user) return res.status(401).json({ mess: 'Email không tồn tại hoặc chưa đăng ký' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ mess: "Mật khẩu không chính xác" });

    const payload = { email: user.email, id: user._id, isAdmin: user.isAdmin, cart: user.cart };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ mess: 'Đăng nhập thành công', token, isAdmin: user.isAdmin, email: user.email, cart: user.cart });
  } catch (err) {
    res.status(404).json({ mess: err.message });
  }
};

const editUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) throw Error('Tài khoản không tồn tại')
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
    }
    if (isAdmin) user.isAdmin = isAdmin;
    const newUser = await user.save();
    if (newUser)
      return res.status(201).json(newUser);
  } catch (err) {
    res.status(404).json({ mess: err.message });
  }
};

const addToCart = async (req, res) => {
  const { cart } = req.body
  const { id } = req.user
  try {
    const user = await userModel.findOneAndUpdate({ _id: id }, { $set: { cart: cart } }, { new: true, runValidators: true })

    return res.status(200).json(user)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  editUser,
  getOneUser,
  login,
  addToCart
}