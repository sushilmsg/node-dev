 
 const jwt =  require("jsonwebtoken");
 const users = require("../models/users");
 

const UserAuth = async (req, res, next)=>{  

   try {
      const { token } = req.cookies;    
      if(!token){
      throw new Error("Token not found!!!!!!!!!!");
      }

      const decodetoken = await jwt.verify(token, "Dev@Nodejs@#!123");

      const { _id } = decodetoken;

      const user = await users.findById(_id);

        if(!user){
           res.send("User Not found");
        }

       req.user = user;
        next();

   } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
   }

}


module.exports = {UserAuth};

