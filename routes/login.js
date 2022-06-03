
const express = require('express') ;
const jwt = require('jsonwebtoken') ;
const router = express.Router() ;
const mysqlConnection = require('../dbconn')



router.post('/',(req,res)=>
{
  let username= req.query.username ;
  let password= req.query.password ;
    console.log(username) ;
    mysqlConnection.query("select * from logininfo1 where Username=? and Password=?",[username,password],function(error,results,fields)
    {
        if(results.length>0)
        {
            const token = jwt.sign({username},'secret',function(err,token)
            {
                res.send(token)
            })
           console.log("Logged In")
        }
        else{
            console.log(error)
        }
       
    })
})
   // Verify Token

   module.exports=router ;