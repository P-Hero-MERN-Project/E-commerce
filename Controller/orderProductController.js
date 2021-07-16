//internat import
const {OrderProduct} =require("./../Model/orderProduct.schema")

//get all order products
async function getOrderProducts(req,res,next){
    try{
    let orderProduct = await OrderProduct.find({}).exec()
    if (orderProduct.length > 0){
        res.status(200).json(orderProduct)
    }
    else{
        res.status(404).json({ message: "No Order Product found" });
    }

    }
    catch(err){
        res.status(500).json({ err });
    }
}

//Post a new product to db
async function postOrderProduct(req,res,next){
const orderProduct=new OrderProduct({
    user: req.body.user,
    orderItems: req.body.orderItems,
    quantity: req.body.quantity,
    price: req.body.price,
    vat_tax: req.body.vat_tax,
    total: req.body.total,
    orderStatus: req.body.orderStatus,
    orderTime: req.body.orderTime,
    shippingAddress:{
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
    },
    paymentMethod: req.body.paymentMethod,
    paymentResult: req.body.paymentResult,
    
});
await orderProduct.save((err,product)=>{
    if(err){
        res.status(500).send(err);
    }
    else{
        res.status(200).send(product);
    }
});
}
//export
module.exports={
    postOrderProduct,
}