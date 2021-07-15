const { Order } = require("../Model/Connection");

// add Order
module.exports.addOrder = async (req, res) => {
  try {
    let order = req.body;
    let newOrder = new Order(order);
    await newOrder.validate();
    await newOrder.save();
    console.log(newOrder.calculateTotal())
    res.status(200).json({message: "Order created successfully"});
  } catch (err) {
    res.status(400).json({err});
  }

};
