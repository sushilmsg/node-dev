const express = require("express");
const profileRouter = express.Router();
const users = require("../models/users");
const { UserAuth } = require("../middleware/auth");


//user profile
profileRouter.get("/profile", UserAuth, async(req, res)=>{

     try{
      const user = req.user;
      console.log(user);
      res.send(user);

     }catch(err){
      
      res.status(400).send("Something went wrong");
     }

    
});

//find all user list
profileRouter.get("/fetchAll", UserAuth, async (req, res) => {
  try {
    const allusers = await users.find({});
    //  console.log(allusers);
    res.send(allusers);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// find user list by id api
profileRouter.get("/fetchById", async (req, res) => {
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

profileRouter.put("/userUpdate/:id", async (req, res) => {
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
profileRouter.delete("/deleteUser/:id", async (req, res) => {
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


module.exports = profileRouter;





