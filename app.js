const express = require('express');
const app = express();

const errorMiddleWare = require('./middleWares/error')

app.use(express.json());

// import all routes
const products = require('./routes/routes')

app.use('/api/v1', products)

// middleware to error handler
app.use(errorMiddleWare)

module.exports = app