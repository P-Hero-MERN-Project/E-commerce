const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../Controller/Product.controller');
const router = express.Router();


router.get('/all', getAllProducts);

router.post('/add', addProduct);

router.put('/update', updateProduct);

router.delete('/delete', deleteProduct);

// export is here
module.exports.ProductRouter = router;
