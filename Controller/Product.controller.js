const { Product } = require("../Model/Connection");

// get all products
module.exports.getAllProducts = async(req, res) =>{
    res.status(200).json({message:"getAll Data"});
}

// add a product
module.exports.addProduct = async(req, res)=>{
    try{
        let product = req.body;
        let newProduct = await new Product(product);
        console.log(newProduct);
        await newProduct.validate();
        res.status(200).json(newProduct);
    }catch(err){
        res.status(500).json({err});
    }
}