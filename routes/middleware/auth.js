const jwt = require("jsonwebtoken");
const userModel = require("../users");


const auth = async(req,res,next) =>{

    try {
      const token = req.cookies.jwt;
      const verifyuser = jwt.verify(token,  process.env.SECRET_KEY)
  
      const user = await userModel.findOne({_id:verifyuser._id})
      next();
    } catch (error) {
        res.redirect("/");
    }
   }

   module.exports = auth;