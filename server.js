const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');


app.get('/', (req, res) => {
  res.send('my server333')
})

// Kết nối MongoDB
mongoose.connect(process.env.MONGDB_URL)
  .then(() => {
    console.log('Kết nối MongoDB thành công!');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running on port', process.env.PORT || 3000);
    });
  })
  .catch((err) => {
    console.error('Lỗi kết nối MongoDB:', err);
  });