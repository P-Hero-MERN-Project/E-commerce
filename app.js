const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const errorMiddleWare = require('./middleWares/error')

app.use(express.json());
app.use(cookieParser())

// import all routes
const products = require('./routes/productRoutes')
const auth = require('./routes/authRoutes')

app.use('/api/v1', products)
app.use('/api/v1', auth)

// middleware to error handler
app.use(errorMiddleWare)

module.exports = app