// const dbconn = require('./dbconn') 
const express = require('express')
const jwt = require('jsonwebtoken');
var app = express() ;
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const mysql = require('mysql2');
const res = require('express/lib/response');
const encoder = bodyparser.urlencoded() ;




var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sampat123',
    database: 'blogapi',
    
  
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DataBase connection succeded.');
    else
        console.log('DataBase connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});
app.listen(5500) ;

app.post('/create', verifyToken, (req, res) => {  
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

app.post('/signup',(req,res)=>
{
    // let id = req.query.id ;
    let username = req.query.username ;
    let password = req.query.password ;
    let id = req.query.id ;

    let sql = 'INSERT INTO logininfo1(username,password,id) VALUE(?,?,?)' ;
    mysqlConnection.query(sql, [username,password,id], (err, rows, fields) => {
                if (!err)
                 
                        
                 res.send('Inserted ');
                    
                else
                    console.log(err);
})
})
app.get('/blogs',verifyToken,(req,res)=>{
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

app.post('/welcome', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secret', (err, authData) => {
      if(err) {
        res.sendStatus(403);
        res.send(err) ;
      } else {
        res.send("welcome"
        );
      }
    });
  });

  
  app.post('/likes/:title', verifyToken, (req, res) => {  
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
  app.post('/postcomment/:posttitle',(req,res)=>{

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
  app.get('/postcomment/:posttitle',(req,res)=>{

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


    

app.post('/login',(req,res)=>
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
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }
  
   
  