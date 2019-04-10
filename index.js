var express = require('express');
const app = express();
var mysql = require('mysql');
const port = 3000;

var con = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "password",
    database: "hw7"
});

con.connect(function(err) {
    if (err)
        console.log(err);
    console.log("Connected!");
});

app.get('/', function(req, res, next) {
    res.send("OK");
});

app.get('/hw7', function(req, res, next){
    var query = "SELECT * FROM assists WHERE Club = '?' AND POS = '?' ORDER BY A, GS";
    con.query(query, [req.body.club, req.body.pos], function (err, result, fields) {
        if (err) 
            console.log(err); 
        console.log(result);
        //var max = 0;
        //var avg = 0;
        //return res.json({club:req.body.club, pos: req.body.pos, max_assists: max, player: player, avg_assists: avg});
        return res.send("OK");
      });
});

app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})
