const express = require('express');
const { getAllProducts, addProduct } = require('../Controller/Product.controller');
const router = express.Router();


router.get('/', getAllProducts);

router.post('/add', addProduct);



// export is here
module.exports.ProductRouter = router;
