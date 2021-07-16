const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct, uploadFile } = require('../Controller/Product.controller');
const router = express.Router();

// multer
const multer = require('multer');
const upload = multer({dest:'./upload/'});


router.get('/all', getAllProducts);

router.post('/add', addProduct);

router.put('/update', updateProduct);

router.delete('/delete', deleteProduct);

router.post('/file', upload.single('myphoto') , uploadFile);

// export is here
module.exports.ProductRouter = router;
