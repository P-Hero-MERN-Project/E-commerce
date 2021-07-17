const express = require("express");
const router = express.Router();

//Internal imports
const { registerAdmin,
    authenticateAdmin}=require("./../Controller/adminController")

// Admin Register Route =>post
router.post("/register", registerAdmin);

//Admin Login Route =>post
router.post("/login", authenticateAdmin);





module.exports = router;