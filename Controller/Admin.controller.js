
const { Admin } = require("../Model/Connection");
const LoginFormSchema = require("../Utility/LoginFormValidationSchema");
const { passwordBcrypt } = require("../Utility/PasswordBcryption");
const SignupFormSchema = require("../Utility/SignUpFormValidationSchema");

// create a admin
module.exports.adminSignup = async(req, res)=>{
    try{
        let admin = req.body;
        try{
            admin = await SignupFormSchema.validateAsync(admin);

            // password encryption
            let hashPassword = await passwordBcrypt(admin.password);
            admin.password = hashPassword;
            let newAdmin = new Admin(admin);
            await newAdmin.validate();
            await newAdmin.save();
            res.status(200).json({message: "Admin created successfully"});
        }
        catch(err){
            res.status(400).json({message:err.details[0].message});
        }
    }catch(err){
        res.status(500).json({err});
    }
}

// admin login
module.exports.adminLogin = async(req, res)=>{

    try{
        let admin = req.body;
        try{
            admin = await LoginFormSchema.validateAsync(admin);
            let adminObject = await Admin.findOne({email:admin.email});
            let result =  await adminObject.sendInfoJsonWebToken(admin.password);
            if(result){
                res.status(200).json({token:result});
            }
            else{
                res.status(401).json({message:"Password incorrect"});
            }
            

        }catch(err){
            res.status(400).json({message:err.details[0].message});
        }

    }catch(err){
        res.status(500).json({err});
    }

}