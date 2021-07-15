const mongoose = require('mongoose');

const {ProductList} = require("../Model/product.schema")

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

//Edit Product
exports.editProduct=(req,res,next)=>{
    var response = {};
    // first find out record exists or not
    // if it does then update the record
    ProductList.findById(req.params.id,function(err,data){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
  
            if(req.body.MovieName !== undefined) {
            
                data.MovieName = req.body.MovieName;
            }
            if(req.body.Language !== undefined) {
               
                data.Language = req.body.Language;
            }
            if(req.body.ReleaseDate !== undefined) {
               
                data.ReleaseDate = req.body.ReleaseDate;
            }
           
            if(req.body.Budget !== undefined) {
               
                data.Budget = req.body.Budget;
            }
            if(req.body.Collection !== undefined) {
               
                data.Collection = req.body.Collection;
            }
            if(req.body.MoviePoster !== undefined) {
               
                data.MoviePoster = req.body.MoviePoster;
            }
            
            // save the data
            data.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error updating data"};
                } else {
                    response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                }
                res.json(response);
            })
        }
    });
}


//export 
module.exports={
    postAddProduct,
}