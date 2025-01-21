const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => {
  res.send('my server333')
})

app.listen(process.env.PORT, () => {
  console.log('listening on port ', process.env.PORT)
})