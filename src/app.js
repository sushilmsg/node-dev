const express = require("express");

const connectdb = require("./config/db");
const app = express();
const port = 3000;

const users = require("./models/users");
const { UserAuth } = require("./middleware/auth");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt =  require("jsonwebtoken");



app.use(express.json());
app.use(cookieParser());

connectdb()
  .then(() => {
    console.log("Database connection successfully");
    app.listen(port, () => {
      console.log(`Server port listing on ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database cannot connected");
  });

//User signup api

app.post("/signup", async (req, res) => {
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

app.post("/signIn", async(req, res) => {
      
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

//user profile
app.get("/profile", UserAuth, async(req, res)=>{

     try{
      const user = req.user;
      console.log(user);
      res.send(user);

     }catch(err){
      
      res.status(400).send("Something went wrong");
     }

    
});


//connection request api

app.post("/connectionrequest", UserAuth, async(req, res)=>{

try{

  const user =  req.user;

  res.send(user.firstName + " connected request successfully");
 
}catch(err){

  res.status(400).send("Error"+err.message)
}

})



//find all user list
app.get("/fetchAll", UserAuth, async (req, res) => {
  try {
    const allusers = await users.find({});
    //  console.log(allusers);
    res.send(allusers);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// find user list by id api
app.get("/fetchById", async (req, res) => {
  try {
    const fetchByIds = await users.findById(req.body);
    if (fetchByIds) {
      res.send(fetchByIds);
    } else {
      res.send("User not found");
    }
  } catch (err) {
    res.send("Something went wrong" + err.message);
  }
});

//find user to update api

app.put("/userUpdate/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    // Find and update the user
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // Return updated document
    );

    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

//delete user api
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Attempt to delete the user by ID
    const result = await users.deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});
