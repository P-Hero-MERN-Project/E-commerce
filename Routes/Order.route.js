const express = require('express');
const { addOrder, showOrder, deleteOrder,  updateOrderStatus } = require('../Controller/Order.controller');

const router = express.Router();


router.get('/show', showOrder);

router.post('/add', addOrder);

router.put('/update/status', updateOrderStatus);

router.delete('/delete', deleteOrder);



module.exports.OrderRouter = router;