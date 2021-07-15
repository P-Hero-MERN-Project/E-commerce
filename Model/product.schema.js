const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Product Schema
const productSchema = new Schema({
  category: {
    categoryId: { type: String },
    categoryName: { type: String },
  },
  productName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  availableSize: {
    type: Array,
  },
  price: { 
      type: Number,
    required: true },
  description: {
    type: String,
    required: true,
  },
  reviews: {
    oneStar: Number,
    twoStar: Number,
    threeStar: Number,
    fourStar: Number,
    fiveStar: Number,
  },
  reviewDescription: [
    {
      reviewerEmail: { type: String, required: true },
      reviewDate: { type: Date, required: true, default: Date.now },
      review: { type: String, required: true },
    },
  ]
  
});
const ProductList = mongoose.model("ProductList", productSchema);

module.exports = { ProductList };

// Category  (object
//     {
//     CategoryId:
//     CategoryName:
//     })
//      Product Name(String)
//     Image (use multer to upload image to database) (String)
//     Available Size (Array)
//     Price (Number)
//     Description (String)
//     Reviews (String)
//     Reviews Description (Object)
