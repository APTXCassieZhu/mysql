var express = require('express');
const app = express();
var mysql = require('mysql');
const port = 3000;

var con = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "password"
});

con.connect(function(err) {
    if (err)
        console.log(err);
    console.log("Connected!");
});

app.get('/',function (req, res, next) {
    res.send("OK");
});

//app.listen(80);
app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})
