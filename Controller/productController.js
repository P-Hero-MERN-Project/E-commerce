//internat import
const {ProductList} = require("../Model/product.schema")

//get all products
async function getAllProducts(req,res,next){
  try{
      let products = await ProductList.find({}).exec()
      if(products.length > 0){
          res.status(200).json(products)
      }
      else{
        res.status(404).json({ message: "No Product found" });
      }
    }
    catch(err){
        res.status(500).json({ err });
    }
  };


//Post a new product to db
async function postAddProduct(req,res,next){
    const product = new ProductList({
        category: { categoryId: req.body.categoryId, categoryName: req.body.categoryName },
        productName: req.body.productName,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        availableSize: req.body.availableSize,

        reviews: {
            oneStar: req.body.oneStar,
            twoStar: req.body.twoStar,
            threeStar: req.body.threeStar,
            fourStar: req.body.fourStar,
            fiveStar: req.body.fiveStar,
        },
        reviewDescription:{
            reviewerEmail: req.body.reviewerEmail,
            reviewDate: req.body.reviewDate,
            review: req.body.review,
        }

    });
    await product.save((err,product)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(product);
        }
    });
}

//update product
async function updateProduct(req,res,next){
    let product =req.body;
    try{

        let updateProduct = await ProductList.findOne({_id: req.body._id}).exec();
        if(updateProduct){
            res.status(200).json({message:"Product update successfully."})
        }
        else{
            res.status(404).json({message:"Product cannot update."});
        }
    }
    catch(err){
        res.status(500).json({err});
    }
  
}

//delete product
async function deleteProduct(req,res,next){
try{
    let product = await ProductList.findOne({_id: req.body._id}).exec();
    if(product){
        product.remove();
        res.status(200).json({message:"Product deleted successfully."});
    }
    else{
        res.status(404).json({message:"Product cannot delete."});
    }
}
    catch(err){
        res.status(500).json({err});
    }

} 

//export 
module.exports={
    getAllProducts,
    postAddProduct,
    updateProduct,
    deleteProduct
}