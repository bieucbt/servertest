const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');
const userRouter = require('./routes/usersRouter')
const cors = require('cors')


// middleWare
app.use(express.json())
app.use(cors())

// routes
app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send('my server333')
})

// Kết nối MongoDB
mongoose.connect(process.env.MONGDB_URL) 
  .then(() => {
    console.log('Kết nối MongoDB thành công!');
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('Lỗi kết nối MongoDB:', err);
  });