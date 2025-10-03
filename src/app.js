const express = require("express");

const app = express();

const port= 3000;

app.use('/user',(req, res,next)=>{ 
 // res.send("Welcome to user route");
  next();
}, (req ,res)=>{   

   res.send("Welcome to another route");
});



app.listen(port, ()=>{
     console.log(`Server port listing on ${port}`);
});


