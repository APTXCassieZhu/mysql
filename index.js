var express = require('express');
const app = express();
var mysql = require('mysql');
var Memcached = require('memcached');
var memcached = new Memcached('localhost:11211');
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
    var key = req.query.club + req.query.pos;
    memcached.get(key, function (err, data) {
        console.log("key is "+key);
        console.log("data is "+data);
        if(err || !data){
            var query = "SELECT * FROM assists WHERE Club = ? AND POS = ? ORDER BY A DESC, GS DESC;";
            query += "SELECT AVG(A) FROM (SELECT * FROM assists WHERE Club= ? AND POS = ?) as avg;";
            con.query(query, [req.query.club, req.query.pos, req.query.club, req.query.pos], function (err, result, fields) {
                if (err) 
                    console.log(err); 
                //console.log(result);
                //console.log(result[0]);
                var value = {club:req.query.club, pos: req.query.pos, max_assists: result[0][0].A, 
                    player: result[0][0].Player, avg_assists: result[1][0]["AVG(A)"]}
                memcached.set(key, value);
                memcached.get(key,function(err,data){console.log("test "+data)});
                return res.json(value);
            });
        }else{
            console.log("mem success");
            return res.json(data);
        }
    });
});

app.listen(80);
/*app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})*/

