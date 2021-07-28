const express = require('express');
const router = express.Router()

const { processPayment, sendStripApi } = require('../controllers/paymentController')

const { isAuthenticatedUser } = require('../middleWares/auth')

router.route('/payment/process').post(isAuthenticatedUser, processPayment)
router.route('/stripe/api').get(isAuthenticatedUser, sendStripApi)

module.exports = router