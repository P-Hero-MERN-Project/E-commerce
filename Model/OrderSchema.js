const mongoose = require("mongoose");

//  Order Schema
const OrderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  user: {
    type: {},
  },
  vat: {
    type: Number,
  },
  
  dateTime: {
    type: Date,
    default: Date.now(),
  },

  status:{
    type:{
      "1":"Pending",
      "2":"Processing",
      "3":"Shipped",
      "4":"Delivered"
    },
    default:{"1":"Pending"}

  },

  shippingAddress: {
    type: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "Bangladesh",
      },
    },
  },
  paymentMethod: {
    type: {
      1: "Bkash",
      2: "Stripe",
    },
    required: true,
  },
});


// this calculate the total 
OrderSchema.methods.calculateTotal = function(){
    return this.products.reduce((sum, currentItem)=>sum+currentItem.price*currentItem.quantity,0);
}

module.exports = OrderSchema;
