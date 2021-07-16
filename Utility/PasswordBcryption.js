const bcrypt = require('bcrypt');


// Function: PasswordBcrypt
// Description: This function will encrypt a password with bcrypt
module.exports.passwordBcrypt = async(password)=>{
    let bcryptPassword = await bcrypt.hash(password, 10);
    return bcryptPassword;
}