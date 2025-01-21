

const getAllProducts = async (req, res) => {
  res.status(200).json({mess: 'get all products'})
}




module.exports = {
  getAllProducts
}