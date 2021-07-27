const Product = require('../models/products')

const ErrorHandler = require('../utlis/errorHandler')
const catchAsyncError = require('../middleWares/catchAsyncError')
const cloudinary = require('cloudinary')

// create new product = /api/v1/admin/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }

    let imagesLinks = []

    for(let i=0; i<images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

// get all products = /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {

    const products = await Product.find()

    if (!products) {
        return next(new ErrorHandler('My Error', 400))
    }

        res.status(200).json({
            success: true,
            productsCount: products.length,
            products
        })


})

// get all products by admin = /api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {

    const products = await Product.find()

    if (!products) {
        return next(new ErrorHandler('My Error', 400))
    }

        res.status(200).json({
            success: true,
            productsCount: products.length,
            products
        })


})

// get single product = /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 400))
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found'
        // })
    }

    res.status(200).json({
        success: true,
        product
    })
})

// admin update product = /api/v1/admin/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 400))
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found'
        // })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

// admin delete product = /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 400))
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found'
        // })
    }

    // delete images associated with the products
    for(let i = 0; i < product.length; i++){
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: 'Product successfully removed'
    })
})