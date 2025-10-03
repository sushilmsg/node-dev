//http connect in node.js

/*
const http = require('http');
http.createServer((req,res)=>{
res.writeHead(200,{'content-type':'text/plain'});
res.end('Hello world');
}).listen(8080, ()=>{
  console.log("Connection successfully");
});


const fs = require('fs');

fs.readFile('./src/myfile.txt','utf8',(err , data)=>{

      if(err){
        console.log("Error reading file:"+err);
         return;
      }
      console.log("File content:==>"+data);
});

console.log("Readinng file.. ( this run first)");
*/