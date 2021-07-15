const express = require('express');
const router = express.Router();

//Internal imports
const {postOrderProduct}=require("../Controller/orderProductController");


//Product route =>Post
router.post('/order-product',postOrderProduct);






//export router
module.exports = router;