const express = require('express');
const dotEnv = require('dotenv');
const {ProductRouter}  = require('./Routes/Product.route.js');
// dotEnv config here
dotEnv.config();

// Create an express app
const app = express();

// db config here
const db = require('./Model/Connection');

// use json format
app.use(express.json());


// Add the product router to the app
app.use('/product', ProductRouter);


// Set the port
const port  = process.env.PORT || 5000;


// Set the port and run the app 
app.listen(port, () => console.log(`Server is running on port ${port}`))