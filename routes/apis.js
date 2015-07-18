/**
 * Created by hyunwoo on 2015-05-04.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');
var utf8 = require('utf8');

var csvParser = require('../functions/CsvToJson');
var stemmer = require('stemmer');

module.exports = router;


var db = require('redis').createClient(13000, '202.30.24.169');
var joseon_dynasty_db = require('redis').createClient(13001, '202.30.24.169');

var kingsName = {};
csvParser.Parse('./ProjectData/joseondynasty/kingsname.csv', function (data) {
    for (var i = 0; i < data.length; i++) {
        kingsName[data[i].key] = data[i].name;
        kingsName[data[i].name] = data[i].key;
    }
});

joseon_dynasty_db.select(2);

router.get('/', function (req, res) {
    res.render('apis');
});

router.get('/docs/joseondynasty', function(req,res){
    res.render('api/joseondynasty/joseondynasty_api');
})

var each_page_data_count =100;

router.get('/twitter/infos', function(req,res){

    res.send("asdf");
    res.end();
})

function sendFailedResult(res){
    res.send(['FAILED']);
    res.end();
}
router.get('/weather', function(req,res){
    var weather = req.query.weather;
    var location = req.query.location;

    var multi = db.multi();
    multi.select(4);
    multi.keys('weather:' + location + ':*');
    multi.exec(function(err,rep){
        if(err != null){
            sendFailedResult(res);
            return;
        }
        var multi = db.multi();
        multi.select(4);
        for(var i = 0 ; i < rep[1].length ; i ++){
            multi.hgetall(rep[1][i]);
        }
        multi.exec(function(err,weathers){
            if(err != null){
                sendFailedResult(res);
                return;
            }

            var result = ['OK', []];
            for(var i = 1 ; i < weathers.length ; i ++){
                if(weathers[i].weather == weather){
                    var each = {};
                    each = weathers[i];
                    each['key'] = rep[1][i - 1];
                    result[1].push(rep[1][i - 1]);
                    result.push(each);
                }
            }

            if(weather == 'Mist') weather = 'Fog';
            else if(weather == 'Fog') weather = 'Mist';
            for(var i = 1 ; i < weathers.length ; i ++){
                if(weathers[i].weather == weather){
                    var each = {};
                    each = weathers[i];
                    each['key'] = rep[1][i - 1];
                    result[1].push(rep[1][i - 1]);
                    result.push(each);
                }
            }
            res.send(result);

        })


    })



})
router.get('/twitter/timetable', function(req,res){
    var multi = db.multi();
    multi.select(2);
    multi.keys('infos:time:*');
    multi.exec(function(err,rep){
        res.send(rep);
        res.end();
    });
})

router.get('/twitter/tweets', function(req,res){
    var location = req.query.location;
    var time = req.query.time;

    var multi = db.multi();
    multi.select(2);
    multi.zrange('location:' + location + ':' + time, 0 , -1);
    multi.exec(function(err,rep){
        if(err != null){
            sendFailedResult(res);
            return;
        }
        if(rep[1] == null || rep[1].length == 0){
            sendFailedResult(res);
            return;
        }

        multi = db.multi();
        multi.select(1);
        for(var i = 0 ; i < rep[1].length ; i ++){
            multi.hgetall(rep[1][i]);
        }
        multi.exec(function(err,rep){
            res.send(rep);
        })
    });
})

router.get('/analysis/russell_model', function(req,res){
    var input = req.query.input;
    var out = stemmer(input);
    //out = out.replace(/./gi,' ');
    console.log(out);
    console.log('-----');
    var words = out.split(' ');
    console.log(words);

    var multi = db.multi();
    multi.select(3);
    for(var i = 0 ; i < words.length; i ++){
        for(var j = 1 ; j < 11 ; j ++){
            multi.hgetall('word:' + j + ':' + words[i]);
        }
    }
    multi.exec(function(err,rep){
        //console.log(rep);
        if(err != null){
            sendFailedResult(res);
            return;
        }
        console.log(rep.length - 1);
        var result = ['OK'];

        result.push({
            input : input,
            out : out,
        })
        for(var i = 1 ; i < rep.length  ; i += 10 ){
            var getResult = false;
            for(var j = i ; j < i + 10 ; j ++){
                if(rep[j] != null) {
                    getResult = true;
                    result.push(rep[j]);

                    break;
                }
            }
        }
        res.send(result);
    })

})

router.get('/analysis/stemmer', function(req,res){
    var input = req.query.input;
    var out = stemmer(input);
    console.log(out);
    res.send(out);
})

router.get('/joseondynasty', function(req,res){

    var kingName = req.query.kingname;
    var page = req.query.page;
    console.log(kingName);
    if(kingName === undefined) kingName = kingsName['a'];
    if(page === undefined) page = 0;
    console.log(kingName);

    var multi = joseon_dynasty_db.multi();

    var kingname_alphabet = kingsName[kingName];
    multi.select(2);
    multi.smembers('King:' + kingname_alphabet);

    var page_start =  each_page_data_count * page;
    var page_end = each_page_data_count + each_page_data_count * page;
    multi.exec(function(err,rep){
        //console.log(rep[1]);
        if(rep[1] != null){
            var multi = joseon_dynasty_db.multi();
            multi.select(2);
            for(var i = page_start ; i < page_end ; i++){
                if(rep[1][i] === undefined) break;
                var key = 'Doc:' + rep[1][i];
                multi.hgetall(key);
            }
            var resultData = {
                totalCount : rep[1].length,
                currentStart :page_start,
                currentEnd : page_end,
                currentCount : page_end - page_start,
                pageCount : Math.ceil(rep[1].length / each_page_data_count),

                body : [],
            }
            multi.exec(function(err,rep){
                for(var i = 1 ; i < rep.length ; i ++){
                    resultData.body.push(rep[i]);
                }
                res.send(resultData);
                res.end();
            })
        }
    })
})

