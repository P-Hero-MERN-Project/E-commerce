const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;
const port = process.env.PORT || 4001;
require("dotenv").config();
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kljii.mongodb.net/ecommerce?retryWrites=true&w=majority`;
const multer = require("multer");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// internal imports
const productRouter= require("./Routes/productRoute")
const orderProductRouter= require("./Routes/orderProductRoute")
const uploadRouter= require("./Routes/UploadImage")

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// database connection
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected!"))
  .catch((error) => console.log(error));


  //routing setup
app.use("/admin",productRouter)
app.use("/order",orderProductRouter)
app.use("/",uploadRouter)


//app.use(multer({des: 'image'}).single('image'));





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });