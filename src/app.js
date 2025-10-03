const express = require("express");

const app = express();

const port= 3000;

const { AdminAuth,UserAuth } =  require("./middleware/auth");

app.use('/admin/', AdminAuth);


app.get('/admin/user',(req, res)=>{
   res.send("User send data");
});

app.get('/user', UserAuth, (req ,res)=>{
   res.send("User login successfully");
});

app.get('/admin/getAllData',(req,res)=>{

   res.send("All data send successfully");
})




app.get('/user/:userId/:name/:password',(req,res)=>{ 
console.log(req.params);
 res.send({'name':'sushil kumar','age':'30 years'});
});



app.post('/user',async (req, res)=>{  
  console.log(req.body);
  res.send("Data successfully save to database");
})

app.delete('/user',(req, res)=>{

  res.send('Deleted successfully');
});


app.listen(port, ()=>{
     console.log(`Server port listing on ${port}`);
});


