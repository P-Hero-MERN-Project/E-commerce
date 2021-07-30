const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const path = require('path')

const errorMiddleWare = require('./middleWares/error')


// setting up config file
if(process.env.NODE_ENV !== 'production') require('dotenv').config({path: './config/config.env'})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())


// import all routes
const products = require('./routes/productRoutes')
const auth = require('./routes/authRoutes')
const order = require('./routes/ordersRoutes')
const payment = require('./routes/paymentRoutes')

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)
app.use('/api/v1', payment)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../e-commerce/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../e-commerce/build/index.html'))
    })
}

// middleware to error handler
app.use(errorMiddleWare)

module.exports = app