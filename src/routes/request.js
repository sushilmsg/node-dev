const express = require("express");

const requestRouter =  express.Router();
const { UserAuth } = require("../middleware/auth");
//connection request api

requestRouter.post("/connectionrequest", UserAuth, async(req, res)=>{
try{
  const user =  req.user;
  res.send(user.firstName + " connected request successfully");
 }catch(err){

  res.status(400).send("Error"+err.message)
}

})


module.exports = requestRouter;

