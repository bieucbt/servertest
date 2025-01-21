const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    const match = await userModel.findOne({ email });
    if (match) return res.status(401).json({ mess: "Email đã tồn tại" });

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.create({ email, password: hash });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ mess: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findByIdAndDelete(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ mess: err });
  }
};

const login = async (req, res) => {
  
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ mess: 'Email không tồn tại hoặc chưa đăng ký' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ mess: "Mật khẩu không chính xác" });

    const payload = { email: user.email, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ mess: 'Đăng nhập thành công', token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(404).json({ mess: err.message });
  }
};

const editUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
    }
    if (email) user.email = email;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(404).json({ mess: 'Không tìm thấy thông tin' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  editUser,
  getOneUser,
  login
}