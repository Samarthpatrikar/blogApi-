
const express = require('express') ;
const jwt = require('jsonwebtoken') ;
const verifyToken=require('./authentication')
const router = express.Router() ;
const bodyparser = require('body-parser');
// app.use(bodyparser.json());
const mysqlConnection = require('../dbconn')


router.post('/:title', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secret', (err, authData) => {
      if(err) {
        res.sendStatus(403);
        res.send(err) ;
      } else {
        let sql = 'UPDATE blogdata SET likes=likes+1 where title=?' ;
        mysqlConnection.query(sql, [req.params.title], (err, rows, fields) => {
                    if (!err)
                     
                            
                     res.send('Liked');
                        
                    else
                        console.log(err);
    })
       
      }
    });
  });

  module.exports=router ;