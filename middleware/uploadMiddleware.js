const multer = require('multer')
const path = require('path')

// Cấu hình nơi lưu file và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../upload')); // Lưu file vào thư mục 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Đặt tên file
  }
});


module.exports = multer({ storage: storage });
  