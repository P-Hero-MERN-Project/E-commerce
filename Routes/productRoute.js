const express = require('express');
const router = express.Router();

//Internal imports
const {postAddProduct} =require("../Controller/productController")


//Product route =>Post
router.post('/add-product',postAddProduct) 







//export router
module.exports = router;