var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database:'ctrmain',  
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql DB!");
});
module.exports =con;