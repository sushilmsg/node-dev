const express = require("express");

const connectdb = require('./config/db');
const app = express();
const port= 3000;

const users =  require('./models/users');

connectdb().then( ()=>{
  console.log("Database connection successfully");
  app.listen(port, ()=>{
     console.log(`Server port listing on ${port}`);
});

app.post('/signup', async(req, res)=>{
   
     const userObj = new users({
       firstName : "utkarsh",
       lastName  : "gupta",
       emailId   : "gupta.utkarsh@gmail.com",
       password :  "utkarsh@12345"

     });

     try {
         await userObj.save();
        res.send("User added successfully");
     }
     catch(err){
      res.status(400).send("Error saving the user"+err.message);
     }
 
});

})
.catch( (err)=>{
 console.log("Database cannot connected");
})






