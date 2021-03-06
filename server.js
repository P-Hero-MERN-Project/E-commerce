const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')

const dotenv = require('dotenv')

// handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.stack}`)
    console.log('Shutting down due to uncaught exception')
    process.exit(1)
})

// setting up config file
if(process.env.NODE_ENV !== 'production') require('dotenv').config({path: './config/config.env'})


// connecting to database
connectDatabase()

//setting up cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// handle unHandle promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down server due to unhandled rejection')
    server.close(() => {
        process.exit(1)
    })
})