var express = require('express');
const app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});
  
con.connect(function(err) {
    if (err)
        console.log(err);
    console.log("Connected!");
});

app.get('/',function (req, res, next) {
    res.send("OK");
});

app.listen(80);
