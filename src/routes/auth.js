const express =  require("express");
const authRouter = express.Router();

const { validateSignupData } = require("../utils/validation");
const users = require("../models/users");
const bcrypt = require("bcrypt");

//User signup api
authRouter.post("/signup", async (req, res) => {
  validateSignupData(req);

  const { firstName, lastName, emailId, password } = req.body;

  const passwordhash = bcrypt.hashSync(password, 10);

  const userObj = new users({
    firstName,
    lastName,
    emailId,
    password: passwordhash,
  });
  try {
    await userObj.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

//SingIn api
authRouter.post("/signIn",  async(req, res) => {
      
  try{
    const { emailId, password } = req.body;
    const User = await users.findOne({ emailId });
    if (!User) {
      throw new Error("Invalid credentials");
    }

 // const isPasswordValid = await bcrypt.compare(password, User.password);
   const isPasswordValid = await User.validatePasword(password);  

    if (isPasswordValid) {    
  //const token = await jwt.sign({_id: User._id}, "Dev@Nodejs@#!123", { expiresIn:'1d' });

   const token = await User.getJWT();
   console.log(token);
     //add cookies
     res.cookie("token",token);
      res.send("Login Successfully");
    } else {
      throw new Error("Error: " + err.message);
    }

  } catch(err){ 

    res.status(400).send("Error: "+err.message);
  }

});

//Logout API

authRouter.post("/logout", async(req, res)=>{
       
         res.cookie("token",null, {          
          expires: new Date(Date.now()),

         });
         res.send("Logout successfully");
});


module.exports = authRouter;

