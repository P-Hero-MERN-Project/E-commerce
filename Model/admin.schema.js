const mongoose = require("mongoose");
const Joi =require('joi');
const Schema = mongoose.Schema;

//admin user schema 
const adminSchema = mongoose.model('Admin',new Schema({
    name: {
        type: String,
        required: true,  
        unique: true,
        minLength: 4,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})
);
function validateAdminRegister(admin){
    const schema=Joi.object({
        name: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(admin)
}
function validateAdminLogin(admin){
    const schema=Joi.object({
        
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(admin)
}

exports.Admin = adminSchema;
exports.validateRegister=validateAdminRegister;
exports.validateLogin=validateAdminLogin;




