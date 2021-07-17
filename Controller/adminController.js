const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


//internal import 
const {Admin,validateRegister,validateLogin} = require("./../Model/admin.schema")

// register admin
async function registerAdmin (req, res,next)  {
    const {error} =validateRegister(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let {name,email,password} = req.body;
    let adminEmail= await Admin.findOne({email:email});
    let adminName =await Admin.findOne({name:name});
    if(adminEmail || adminName) return res.status(400).send("Email or Name already exist");
    let newAdmin = new Admin({name,email,password});
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    newAdmin.password = hashedPassword;

    await newAdmin.save();
    
    res.status(200).send("Admin created successfully");
}

//authenticate admin
async function authenticateAdmin (req, res,next) {
    const {error} =validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let {email,password} = req.body;
    let admin = await Admin.findOne({email:email});
    if(!admin) return res.status(400).send("Email or Password is wrong");
    let isMatch = await bcrypt.compare(password,admin.password);
    if(!isMatch) return res.status(400).send("Email or Password is wrong");
    
    jwt.sign({user}, "secretkey",{expiresIn: "1h"}, (err, token)=>{
        res.json({
         token,email,
        })
      })
    
}

module.exports = {
    registerAdmin,
    authenticateAdmin
}