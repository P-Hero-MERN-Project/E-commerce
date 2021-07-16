const express =require('express');
const router = express.Router();
const multer = require('multer');
const {UploadImage} =require("./../Model/uploadImage")

const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
        cb(null, './public/images/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})

const upload = multer({ storage: storage }).single('image')

router.post('/uploadImage', async(req, res, next)=>{
    console.log(req.body.title)

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
//    return res.status(200).send(req.file)

 })
 const uploadImage= new UploadImage({
     title: req.body.title,
     image: req.file,
 }) 
await uploadImage.save((err, data)=>{
    if(err){
        res.status(500).send(err);
    }
    else{
        res.status(200).send(uploadImage);
    }
});
})  




// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images')
//     },
    
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// });
// const fileFilter = (req,file,cb) => {
//     if(file.mimetype === "image/jpg"  || 
//        file.mimetype ==="image/jpeg"  || 
//        file.mimetype ===  "image/png"){
     
//     cb(null, true);
//    }else{
//       cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
// }
// }
// const upload = multer({storage: storage, fileFilter : fileFilter});

// router.post('/uploadImage',upload.single('image'),async(req,
//     res, next )=>{

// let uploadImage = new UploadImage({
//     title: req.body.name,
//     image: req.file,
// });
// await uploadImage.save();
// res.send(uploadImage);
// });

//export router
module.exports = router;


