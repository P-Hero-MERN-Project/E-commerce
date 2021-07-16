const { Product } = require("../Model/Connection");

// get all products
module.exports.getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({}).exec();
    products.length > 0
      ? res.status(200).json({ products })
      : res.status(404).json({ message: "No Product found" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// add a product
module.exports.addProduct = async (req, res) => {
  try {
    let product = req.body;
    let newProduct = await new Product(product);
    await newProduct.validate();
    await newProduct.save();
    res.status(200).json({ message: "Product added successfully." });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// update a product
module.exports.updateProduct = async(req, res)=>{
    try{

        let product = req.body;
        let updateProduct = await Product.findByIdAndUpdate(product._id, product);
        
        updateProduct?
        res.status(200).json({message:"Product update successfully."})
        :res.status(404).json({message:"Product cannot update."});
    }catch(err){
        res.status(500).json({err});
    }
}

// delete a product
module.exports.deleteProduct = async(req, res)=>{
    try{
        let product = await Product.findOneAndDelete({_id:req.body._id});
        product?res.status(200).json({message:"Product deleted successfully."})
        :res.status(404).json({message:"Product cannot delete."});
    }catch(err){
        res.status(500).json({err});
    }
}


// upload file
module.exports.uploadFile = async(req, res)=>{
  try{

    console.log(req.file);

  }catch(err){
    res.status(500).json({err});
  }
}