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

})
.catch( (err)=>{
 console.log("Database cannot connected");
})






