const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
// dotEnv config here
dotEnv.config();

// Create an express app
const app = express();

// Allow cross-origin requests
app.use(cors());

// use json format
app.use(express.json());

// always use router after use(cors())
const {ProductRouter}  = require('./Routes/Product.route.js');
const { OrderRouter } = require('./Routes/Order.route.js');



// Add the product router to the app
app.use('/product', ProductRouter);

// Add the Order router to the app
app.use('/Order', OrderRouter);


// Set the port
const port  = process.env.PORT || 5000;


// Set the port and run the app 
app.listen(port, () => console.log(`Server is running on port ${port}`))