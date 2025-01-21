

const getAllProducts = async (req, res) => {
  res.status(200).json({mess: 'get all products'})
}

const createProduct = async (req, res) => {
  try{
    res.status(200).json({body: {...req.body}, upload: req.file})
  }catch(err){
    res.status(500).json({mess: err})
  }
}


module.exports = {
  getAllProducts,
  createProduct
}