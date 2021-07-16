const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadImageSchema = new Schema({
    image:{ type:String,required: true },
    title:{ type:String,required: true }
})

const UploadImage =mongoose.model("UploadImage", uploadImageSchema);
module.exports = {UploadImage};