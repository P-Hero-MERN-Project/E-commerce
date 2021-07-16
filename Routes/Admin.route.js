const express = require('express');
const { adminSignup, adminLogin } = require('../Controller/Admin.controller');
const router = express.Router();



router.post('/signup', adminSignup);

router.post('/login', adminLogin);


module.exports.AdminRouter = router; 