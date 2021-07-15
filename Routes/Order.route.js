const express = require('express');
const { addOrder } = require('../Controller/Order.controller');

const router = express.Router();


// router.get('/get')

router.post('/add', addOrder);



module.exports.OrderRouter = router;