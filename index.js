var express = require('express');
const app = express();
var mysql = require('mysql');
const port = 3001;

var con = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "password",
    database: "hw7",
    multipleStatements: true
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
    // get the max assist
    var query = "SELECT * FROM assists WHERE Club = ? AND POS = ? ORDER BY A DESC, GS DESC";
    query += "SELECT AVG(A) FROM (SELECT * FROM assists WHERE Club= ? AND POS = ?) as avg";
    con.query(query, [req.query.club, req.query.pos], function (err, result, fields) {
        if (err) 
            console.log(err); 
        console.log(result);
        console.log(result[0]);
        var max = result[0].A;
        var player = result[0].player;
        //return res.json({club:req.body.club, pos: req.body.pos, max_assists: max, player: player, avg_assists: avg});
        return res.send("OK");
      });
});

app.listen(80);
/*app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})*/

