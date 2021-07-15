const mongoose = require('mongoose');

// product schema
const ProductSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        length:[1,10]
    },
    description:{
        type:String,
        length:[1,50]
    },
    price:{
        type:Number,
        required:true,
        min:100
    },
    category:{
        type:{
            categoryName:String
        },
        required:true
    },
    image:{
        type:String,
        required:true
    },
    size:{
        type:[]
    }
})

module.exports = ProductSchema;