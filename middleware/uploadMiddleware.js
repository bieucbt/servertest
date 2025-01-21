const multer = require('multer')

// Cấu hình nơi lưu file và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/images'); // Lưu file vào thư mục 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Đặt tên file
  }
});

module.exports = multer({ storage: storage });
