const express = require('express') ;
const jwt = require('jsonwebtoken') ;
const verifyToken=require('./authentication') 
const bodyparser = require('body-parser');
const mysqlConnection = require('../dbconn')
// app.use(bodyparser.json());
const router = express.Router() ;


router.get('/',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secret', (err, authData) => {
       if(err) {
         res.sendStatus(403);
         res.send(err) ;
       } else {
         let sql = 'SELECT * FROM blogdata' ;
         mysqlConnection.query(sql, [req.params.title], (err, rows, fields) => {
                     if (!err)
                      
                             
                      res.send(rows);
                         
                     else
                         console.log(err);
     })
       }
     });
 
 })

 module.exports=router ;