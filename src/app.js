const express = require("express");

const connectdb = require('./config/db');
const app = express();
const port= 3000;

const users =  require('./models/users');

app.use(express.json());

connectdb().then( ()=>{
  console.log("Database connection successfully");
  app.listen(port, ()=>{
     console.log(`Server port listing on ${port}`);
});

})
.catch( (err)=>{
 console.log("Database cannot connected");
})


//User signup api

app.post('/signup', async(req, res)=>{
   
     const userObj = new users(req.body);
     try {
         await userObj.save();
        res.send("User added successfully");
     }
     catch(err){
      res.status(400).send("Error saving the user"+err.message);
     }
 
});

//find all user list
app.get('/fetchAll', async(req, res)=>{
  try{
    const allusers =  await users.find({});
  //  console.log(allusers);
    res.send(allusers);
  }catch(err){
    res.status(400).send("something went wrong");
  }

})

// find user list by id api
app.get('/fetchById', async(req, res)=>{
   try{
    const fetchByIds =await users.findById(req.body);
     if(fetchByIds){
       res.send(fetchByIds);
     }else{
      res.send("User not found");
     }

   }catch(err){      
      res.send("Something went wrong"+err.message);
   }
});

//find user to update api

app.put('/userUpdate/:id', async (req, res) => {
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
        data: updatedUser
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found"
      });
    }


  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
});

//delete user api
app.delete('/deleteUser/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Attempt to delete the user by ID
    const result = await users.deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
});





