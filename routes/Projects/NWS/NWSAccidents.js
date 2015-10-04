/**
 * Created by Luan on 15. 10. 4..
 */
var express = require('express');
var router = express.Router();


module.exports = router;

var redis = require('redis');

// port 16800
var db = require('redis').createClient(16800, '202.30.24.169');

router.get('/', function (req, res) {
    console.log("in new projects");
    res.render('projects/SementicNode/sementicnode_controller');

});

router.get('/RawData/get', function (req, res) {
    var start = req.query.start;
    var count = req.query.count;
    var format = req.query.format;

    if (start === undefined || start === "") start = 0;
    if (count === undefined || count === "") count = 100;
    if (count > 1000) count = 1000;
    if (format === undefined || format === "") format = "json";

    var multi = db.multi();
    var end = Number(start) + Number(count);
    multi.select(0);
    multi.hgetall("Text:Header");

    multi.exec(function (err, rep) {
        var dataCount = Number(rep[1].count);
        if (dataCount < start) {
            res.send("OVER REQUEST INDEX");
            return;
        } else if (end > dataCount) {
            end = dataCount;
        }

        db.zrange("Text:List", start, end, function (err, rep) {
            multi = db.multi();
            for (var i = 0; i < rep.length; i++) {
                multi.hgetall(rep[i]);
            }
            multi.exec(function (err, rep) {
                if (err != null) {
                    res.send("ERROR");
                    return;
                }
                if(format === "csv"){
                    var result = "<pre>\n";
                    result += "id\t\tnumbers\t\t\t\t\t\t\t\t\t\t\t\t\t\tbody\n";
                    for(var i = 0; i < rep.length ; i ++){
                        result += rep[i].id + "\t" + rep[i].numbers + "\t" + rep[i].body + "\n";
                    }
                    result += "</pre>";
                    res.send(result);
                } else {
                    var json = JSON.stringify(rep, null, "\t");
                    var result = "<pre>\n";
                    result += json;
                    result += "\n</pre>";
                    res.send(result);
                }

            })
        })

    })

});