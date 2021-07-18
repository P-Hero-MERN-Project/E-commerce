const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/e-commerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(con => {
        console.log(`MongoDB database connected with host: ${con.connection.host}`)
    })
}

module.exports = connectDatabase