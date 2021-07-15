const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Order product schema
const orderProductSchema = new Schema({
  user: { type: String, required: true },
  orderItems: [
    {
      productQuentity: { type: Number, required: true },
      price: { type: Number, required: true },
      //   productId:{
      //     type: mongoose.Schema.Types.ObjectId,
      //     required: true,
      //     ref: 'ProductList',
      //   },
    },
  ],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  vat_tax: { type: Number, required: true },
  total: { type: Number, required: true },
  orderStatus: { type: String, required: true, default: "Pending" },
  orderTime: { type: Date, required: true, default: Date.now },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
  },
});

const OrderProduct = mongoose.model("OrderList", orderProductSchema);

module.exports = { OrderProduct };

// User (String)
// Product list (Array)
// [
// {
// ProductId (Number)
// ProductQuentity(Number)
// }
// ]
// Quantity (Number)
// Price (Number)
// Vat+shipping (Number)
// Total (Number)
// Order Status (String)
