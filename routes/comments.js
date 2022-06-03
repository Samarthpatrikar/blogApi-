const express = require('express') ;
const jwt = require('jsonwebtoken') ;
const bodyparser = require('body-parser');
// app.use(bodyparser.json());
const mysqlConnection = require('../dbconn')

const router = express.Router() ;


 router.post('/:posttitle',(req,res)=>{

    let comment = req.query.comment
    let posttitle = req.params.posttitle ;
    // let usname=username ;
    
    let sql='INSERT INTO postcomments (title,comment) VALUES (?,?)'
    
    mysqlConnection.query(sql,[posttitle,comment],(err,rows)=>{
        if(err)
         console.log(err)
         else
         res.send('Added comment successfully ..')
    })
    
    }) 
  router.get('/:posttitle',(req,res)=>{

    // let comment = req.query.comment
    let posttitle = req.params.posttitle ;
    // let usname=username ;
    
    let sql='SELECT * FROM postcomments WHERE title=? '
    
    mysqlConnection.query(sql,[posttitle],(err,rows)=>{
        if(err)
         console.log(err)
         else
         
         res.send(rows)
    })
    
    }) 

    module.exports=router ;