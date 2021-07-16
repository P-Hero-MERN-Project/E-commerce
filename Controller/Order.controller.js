const { Order } = require("../Model/Connection");

// add Order
module.exports.addOrder = async (req, res) => {
  try {
    let order = req.body;
    let newOrder = new Order(order);
    await newOrder.validate();
    await newOrder.save();
    res.status(200).json({message: "Order created successfully"});
  } catch (err) {
    res.status(400).json({err});
  }

};

// show Order
module.exports.showOrder = async(req, res)=>{
  try{
    let order = await Order.find({}).exec();
    order.length>0?
    res.status(200).json(order)
    :res.status(404).json({message:"No Oreder found."})

  }catch(err){
    res.status(400).json({err});
  }
}

// update Order
module.exports.updateOrderStatus = async(req, res)=>{
  try{

    let order = await Order.findByIdAndUpdate(req.body._id, req.body);
    order?res.status(200).json({message:"Order updated successfully"})
    :res.status(404).json({message: "No Order found."});

  }catch(err){
    res.status(400).json({err})
  }
}

// delete Order
module.exports.deleteOrder = async(req, res)=>{
  try{

    let order = await Order.findByIdAndDelete(req.body._id);
    order?res.status(200).json({message:"Order deleted successfully"})
    :res.status(404).json({message: "No Order found."});

  }catch(err){
    res.status(400).json({err});
  }
}