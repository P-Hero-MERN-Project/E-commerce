const express = require('express');
const { adminSignup } = require('../Controller/Admin.controller');
const router = express.Router();



router.post('/signup', adminSignup);




module.exports.AdminRouter = router; 