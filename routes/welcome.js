
const express = require('express') ;
const jwt = require('jsonwebtoken') ;
const bodyparser = require('body-parser');
const router = require('./blog');
const verifyToken=require('./authentication')
// app.use(bodyparser.json());



router.post('/', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secret', (err, authData) => {
      if(err) {
        res.sendStatus(403);
        res.send(err) ;
      } else {
        res.send("welcome"
        );
      }
    });
  })

  module.exports=router ;