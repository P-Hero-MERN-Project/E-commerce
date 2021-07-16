const multer = require('multer');
const path = require('path');

// create a multer storage engine to upload files
const storage = multer.diskStorage({
    destination:(req,file, cb)=>{

        cb(null, './upload/')
    },
    filename:(req, file, cb)=>{
        cb(null, fileUniqueName(file.originalname))
    }
})

const upload = multer({storage});


// making a unique name
const fileUniqueName = (fileName)=>{
    let name = `${Math.random()*5}${Math.random()*10}${Math.random()*100}${Date.now()}${path.extname(fileName)}`;
    return name;
}



module.exports = upload;