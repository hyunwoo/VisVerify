/**
 * Created by Luan on 2015. 11. 18..
 */
var express = require('express');
var router = express.Router();
var bases = require('bases');
var redis = require('redis');
var db = redis.createClient(16801, "202.30.24.169");
var sortBy = require('sort-by');
module.exports = router;

var noLinkedOpacity;

router.get('/', function (req, res) {
    console.log("in");
    res.render('projects/CRC/crc_main');
})

router.get('/visualization/prototype01', function (req, res) {
    res.render('projects/CRC/crc_proto01');
})


router.get('/visualization/prototype02', function (req, res) {
    res.render('projects/CRC/crc_proto02');
})

router.get('/visualization/prototype03', function (req, res) {
    res.render('projects/CRC/crc_proto03');
})

router.get('/getOriginNetwork', function (req, res) {
    console.log("GET CRC DATA");
    var start = Number(req.query.start);
    var count = Number(req.query.count);
    console.log(start,count);
    if(count === undefined) count = 100;
    if(start === undefined) start = 1;
    if(start < 1) start = 1;

    getCRCToNetworkData(start, count, function(d){
        res.send(d);
    })
})

router.get('/getVisNetwork', function (req, res) {
    console.log("GET CRC DATA");
    var start = Number(req.query.start);
    var count = Number(req.query.count);
    console.log(start,count);
    if(count === undefined) count = 100;
    if(start === undefined) start = 1;
    if(start < 1) start = 1;

    getCRCToVisNetworkData(start, count, function(d){
        res.send(d);
    })
})

router.get('/getBundleData', function (req, res) {
    console.log("GET CRC DATA");
    var start = Number(req.query.start);
    var count = Number(req.query.count);
    console.log(start,count);
    if(count === undefined) count = 100;
    if(start === undefined) start = 1;
    if(start < 1) start = 1;

    getCRCToBundleData(start, count, function(d){
        res.send(d);
    })
})

//getCRCToNetworkData(1, 500, function(d){ console.log(d) })
function getCRCToNetworkData(start,count, func){
    var multi = db.multi();

    if(count === undefined) count = 100;
    if(start === undefined) start = 1;

    console.log("REQUEST TO DATABASE GET : " + start + " , " + count)

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
            var prefix = rep[i].name[0];
            var score = (bases.fromBase62(prefix) - 36) / 26;

            points.push({
                id : rep[i].name,
                idx : rep[i].id,
                size : 1,
                type : 'circle',
                score : score,

            });
        }
        for(var i = 1; i < count + 1; i ++){
            var connect = rep[i + count + 1];
            if(connect != null) {
                for (var j = 0; j < connect.length; j++) {
                    var target = Number(connect[j]);
                    target = target - start;
                    if (target < 0) continue;
                    if (target >= count) continue;
                    var source = i - 1;
                    if (source >= target) continue;
                    points[source].size += 3;
                    points[target].size += 3;

                    connections.push({
                        source: Number(source),
                        target: Number(target),
                    });
                }
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

//getCRCToVisNetworkData(10, 10, function(d){ console.log(d) })
function getCRCToVisNetworkData(start,count, func){
    var multi = db.multi();

    if(count === undefined) count = 100;
    if(start === undefined) start = 1;

    console.log("REQUEST TO DATABASE GET : " + start + " , " + count)

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
            var prefix = rep[i].name[0];
            var score = (bases.fromBase62(prefix) - 36) ;

            points.push({
                label : rep[i].name,
                id : rep[i].id - start,
                group : score,
                isConnect : false,
                value : 1,

            });
        }
        for(var i = 1; i < count + 1; i ++){
            var connect = rep[i + count + 1];
            var source = i - 1;
            var isChecked = false;
            if(connect != null) {
                for (var j = 0; j < connect.length; j++) {
                    var target = Number(connect[j]);
                    target = target - start;
                    if (target < 0) continue;
                    if (target >= count) continue;

                    if (source >= target) continue;


                    points[source].isConnect = true;
                    points[target].isConnect = true;
                    points[source].value += 5;
                    points[target].value += 5;

                    connections.push({
                        from: Number(source),
                        to: Number(target),
                    });
                    isChecked = true;
                }
            }

        }

        var notConnectList = [];
        for(var i = 0 ; i < points.length; i ++){
            if(!points[i].isConnect) {
                notConnectList.push(i);
            }
        }

        for(var i = notConnectList.length - 1 ; i >= 0 ; i --){
            points.splice(notConnectList[i],1);
        }

        var result = {
            success: true,
            nodes : points,
            edges : connections,
        }

        func(result);
        console.log(result);
    })

}

//getCRCToBundleData(1, 100, function(d){console.log(JSON.stringify(d, null, 4))})
function getCRCToBundleData(start,count, func){
    var multi = db.multi();

    if(count === undefined) count = 100;
    if(start === undefined) start = 1;

    console.log("REQUEST TO DATABASE GET : " + start + " , " + count)

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
            var prefix = rep[i].name[0];
            var score = (bases.fromBase62(prefix) - 36) / 26;


            var convert_name = rep[i].name;


            var d = {
                name : rep[i].id - start,
                convert_name : convert_name,
                size : 1,
                type : 'circle',
                score : score,
                imports : [],
            }

            var connect = rep[i + count + 1];
            if(connect == null) continue;
            for(var j = 0 ; j < connect.length ; j ++){
                var target = Number(connect[j]);
                target = target ;
                if(target < 0) continue;
                if(target >= count) continue;
                var source = i - 1;
                if(source >= target) continue;

                d.size += 3;
                d.imports.push(target + '');
            }

            points.push(d);

        }
        points.sort(sortBy('convert_name', 'score'));

        var result = {
            success: true,
            data : points,
        }


        func(result);
    })

}


