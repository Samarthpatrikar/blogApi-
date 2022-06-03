const mysql = require('mysql2')




var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sampat123',
    database: 'blogapi',
    
  
});
module.exports=mysqlConnection ;