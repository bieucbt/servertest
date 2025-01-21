const userModel = require('../models/userModel');
require('dotenv').config();

const getAllUsers = async (req, res) => {
  try {
    const userData = await userModel.find({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(404).json({ mess: err });
  }
};


module.exports = {
  getAllUsers
}