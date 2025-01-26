const multer = require('multer')
const path = require('path')

const cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Đối tượng cloudinary đã cấu hình
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    public_id: (req, file) => {
      const name = file.originalname.replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return Date.now() + '-' + name;
    },
  },
});


module.exports = multer({ storage: storage });


