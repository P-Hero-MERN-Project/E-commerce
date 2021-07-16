const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jsonWebToken = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// info into jsonwebtoken
AdminSchema.methods.sendInfoJsonWebToken = async function(password){

    const isAdmin = await bcrypt.compare(password, this.password);
    if(isAdmin){
        return jsonWebToken.sign({
            name:this.name,
            email:this.email
        }, process.env.SECRET_KEY);
    }
    else{
        return false;
    }

}


module.exports = AdminSchema;