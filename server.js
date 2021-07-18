const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv')

// handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.stack}`)
    console.log('Shutting down due to uncaught exception')
    process.exit(1)
})

// setting up config file
dotenv.config({path: './config/config.env'})

// connecting to database
connectDatabase()

app.listen(process.env.PORT, () => {
    console.log(`server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})
