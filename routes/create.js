const express = require('express') ;
const jwt = require('jsonwebtoken') ;
const router = express.Router() ;
const bodyparser = require('body-parser');
// app.use(bodyparser.json());
const verifyToken=require('./authentication')
const mysqlConnection = require('../dbconn')



router.post('/', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secret', (err, authData) => {
      if(err) {
        res.sendStatus(403);
        res.send(err) ;
      } else {
        let title = req.query.title ;
        let post = req.query.post ;
        let likes = 0 ;
        
      let sql = 'INSERT INTO blogdata(title,post,likes) VALUE(?,?,?)' ;
      mysqlConnection.query(sql, [title,post,likes], (err, rows, fields) => {
                  if (!err)
                   
                          
                   res.send('Post Created ');
                      
                  else
                      console.log(err);
  })
  
        
  
        
      }
    });
  });

  module.exports=router ;