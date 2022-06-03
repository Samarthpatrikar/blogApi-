// const dbconn = require('./dbconn') 
const express = require('express')
const jwt = require('jsonwebtoken');
const app = express() ;
// const router = express.Router();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const mysql = require('mysql2');
const res = require('express/lib/response');
const encoder = bodyparser.urlencoded() ;
const blog =require('./routes/blog');
const comments=require('./routes/comments')
const create=require('./routes/create')
const likes=require('./routes/likes')
const login=require('./routes/login')
const signup=require('./routes/signup')
const welcome = require('./routes/welcome')
const mysqlConnection = require('./dbconn')
app.use('/blog',blog)
app.use('/postcomment',comments)
app.use('/likes',likes)
app.use('/create',create)
app.use('/login',login)
app.use('/signup',signup)
app.use('/welcome',welcome)






// var mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'sampat123',
//     database: 'blogapi',
    
  
// });

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DataBase connection succeded.');
    else
        console.log('DataBase connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});
app.listen(5500) ;

// module.exports=mysqlConnection ;






  
  
 



    

   
  