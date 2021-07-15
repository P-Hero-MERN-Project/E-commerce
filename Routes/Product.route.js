const express = require('express');
const { getAllProducts } = require('../Controller/Product.controller');
const router = express.Router();


router.get('/', getAllProducts);



// export is here
module.exports.ProductRouter = router;
