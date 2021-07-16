const mongoose = require('mongoose');
const AdminSchema = require('./AdminSchema');
const OrderSchema = require('./OrderSchema');
const ProductSchema = require('./ProductSchema');

// mongoose connection
const db = mongoose.connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`, { useNewUrlParser: true,  useUnifiedTopology: true });

const Product = mongoose.model("Product", ProductSchema);
const Order = mongoose.model("Order", OrderSchema);
const Admin = mongoose.model("Admin", AdminSchema);


module.exports = {db, Product, Order, Admin}