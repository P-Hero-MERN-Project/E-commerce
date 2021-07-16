const express = require('express');
const router = express.Router();

//Internal imports
const {getAllProducts,
    postAddProduct,
    updateProduct,
    deleteProduct} =require("../Controller/productController")


//Product route =>Post
router.post('/add-product',postAddProduct) 
//Product route =>Get
router.get('/get-all-products',getAllProducts)
//Product route =>Put
router.put('/update-product/:id',updateProduct)
//Product route =>Delete
router.delete('/delete-product/:id',deleteProduct)







//export router
module.exports = router;