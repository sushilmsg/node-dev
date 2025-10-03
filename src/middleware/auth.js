
const AdminAuth = (req, res, next )=>{

     console.log("Admin auth is getting checked!! ");
    const auth = "xyz";
    const authorization = auth == "xyz";    

    if(!authorization){      
       res.send("unathorization token");
    }else{
      next();
    }
};


const UserAuth = (req, res, next)=>{   
   console.log("user auth is getting checked");
   
   const auth="USERTOKEN";

   const authorization = auth == "USERTOKEN";

   if(!authorization){
      res.send("Unauthorization token");
   }else{

     next();

   }
}


module.exports = {AdminAuth, UserAuth};

