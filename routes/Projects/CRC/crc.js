/**
 * Created by Luan on 2015. 11. 18..
 */
var express = require('express');
var router = express.Router();

var redis = require('redis');
var db = redis.createClient(16801, "202.30.24.169");
module.exports = router;
var multi = db.multi();
router.get('/get', function (req, res) {

    console.log("GET CRC DATA");
    var start = req.query.start;
    var count = req.query.count;

    if(count === undefined) count = 100;
    if(start === undefined) start = 1;

    getCRCToNetworkData(start, count, function(d){
        res.send(d);
    })


})

//getCRCToNetworkData(1, 100, function(d){ console.log(d) })
function getCRCToNetworkData(start,count, func){

    if(count === undefined) count = 100;
    if(start === undefined) start = 1;

    multi.select(0);
    for (var i = start; i < count + start; i++) {
        multi.hgetall('' + i);
    }
    multi.select(1);
    for (var i = start; i < count + start; i++) {
        multi.smembers('' + i);
    }
    multi.exec(function (err, rep) {
        if(err != null){
            func({
                success:false,
                err : err,
            })
            return;
        }
        //console.log(err, rep);
        var points = [];
        var connections = [];
        for(var i = 1; i < count + 1; i ++){
            points.push({
                id : rep[i].name,
                idx : rep[i].id,
                size : 1,
                type : 'circle',
            });
        }
        for(var i = 1; i < count + 1; i ++){
            var connect = rep[i + count + 1];
            for(var j = 0 ; j < connect.length ; j ++){
                var target = Number(connect[j]);
                target = target - start;
                if(target < 0) continue;
                if(target >= count) continue;
                var source = i - 1;
                if(source >= target) continue;

                points[target].size ++;

                connections.push({
                    source : Number(source),
                    target : Number(target),
                });
            }
        }

        var result = {
            success: true,
            nodes : points,
            links : connections,
        }
        func(result);
    })

}


router.get('/', function (req, res) {
    console.log("in");
    res.render('projects/CRC/crc_main');
})


router.get('/visualization/prototype01', function (req, res) {
    res.render('projects/CRC/crc_proto01');
})


router.get('/visualization/kor', function (req, res) {
    res.render('projects/Cosmovis/cosmovis_kor');
})



