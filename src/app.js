const express = require("express");

const app = express();

const port= 3000;

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


