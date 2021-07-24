const User = require('../models/user')

const ErrorHandler = require('../utlis/errorHandler')
const catchAsyncError = require('../middleWares/catchAsyncError')
const sendToken = require('../utlis/jwtToken')
const sendEmail = require('../utlis/sendEmail')

const crypto = require('crypto')

// register a user = /api/v1/register
exports.registerUser = catchAsyncError (async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: 'avatars/eahhtj1bkn1k9gjgd3hn',
            url: 'https://res.cloudinary.com/bookit/image/upload/v1606233125/products/eahhtj1bkn1k9gjgd3hn.jpg'
        }
    })

    // const token = user.getJwtToken()

    // res.status(200).json({
    //     success: true,
    //     token
    // })

    sendToken(user, 200, res)
})

// login user => /api/v1/login
exports.loginUser = catchAsyncError (async (req, res, next) => {

    const {email, password} = req.body;

    // checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    // finding user in database
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 400))
    }

    //checks if password is correct or not
    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return next(new ErrorHandler('Invalid email or password', 400))
    }

    // const token = user.getJwtToken()

    // res.status(200).json({
    //     success: true,
    //     token
    // })

    sendToken(user, 200, res)
})

// forgot password = /api/v1/password/forgot
exports.forgotPassword = catchAsyncError (async (req, res, next) => {

    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler('User not found with is user', 404))
    }

    // get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not request this email, then ignore it.`

    try{

        await sendEmail({
            email: user.email,
            subject: 'e-commerce password recovery',
            message
        })


        res.status(200).json({
            success: true,
            message: `Email set to: ${user.email}`
        })

    } catch (error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError (async (req, res, next) => {

    // hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    }

    // set new password
    user.password = req.body.password

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save()

    sendToken(user, 200, res)
})

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncError (async (req, res, next) => {

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// Update / change password = /api/v1/password/update
exports.updatePassword = catchAsyncError (async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password')

    // checks previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect', 400))
    }

    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
})

// Logout user = /api/v1/logout
exports.logoutUser = catchAsyncError (async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logout successfully'
    })
})

// update user profile = /api/v1/me/update
exports.updateProfile = catchAsyncError (async (req, res, next) => {

    const newUserDate = {
        name: req.body.name,
        email: req.body.email
    }

    // update avatar : TODO
    const user = await User.findByIdAndUpdate(req.user.id, newUserDate, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Admin routes/ get all users = /api/v1/admin/users
exports.allUsers = catchAsyncError (async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// get user details = /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError (async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not found with id ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
})

// update user profile = /api/v1/admin/user/:id
exports.updateUser = catchAsyncError (async (req, res, next) => {

    const newUserDate = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserDate, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// delete user = /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError (async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not found with id ${req.params.id}`));
    }

    // remove avatar from cloudinary - todo

    await user.remove();

    res.status(200).json({
        success: true
    })
})
