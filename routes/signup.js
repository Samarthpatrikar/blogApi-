const express = require('express') ;
const router = express.Router() ;
const verifyToken=require('./authentication')
const bodyparser = require('body-parser');
// app.use(bodyparser.json());
const mysqlConnection = require('../dbconn')


router.post('/',(req,res)=>
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

module.exports=router ;