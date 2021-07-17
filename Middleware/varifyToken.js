//varifyToken
async function varifyToken(req, res, next) {
    //get auth header value
    const bearerHeader= await req.headers["authorization"]
    if(typeof bearerHeader !=="undefined"){
      const token=bearerHeader.split(" ")[1]
     
        req.token=token
        next()
      }else{
      res.sendStatus(403)
    } 
    }
module.exports={varifyToken}