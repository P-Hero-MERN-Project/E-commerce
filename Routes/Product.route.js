const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct, uploadFile } = require('../Controller/Product.controller');
const upload = require('../Utility/FileUploadSystem');
const router = express.Router();




router.get('/all', getAllProducts);

router.post('/add', upload.single('image'), addProduct);

router.put('/update', updateProduct);

router.delete('/delete', deleteProduct);

router.post('/file', upload.single('myphoto') , uploadFile);



// export is here
module.exports.ProductRouter = router;
