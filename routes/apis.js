/**
 * Created by hyunwoo on 2015-05-04.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');
var utf8 = require('utf8');

var csvParser = require('../functions/CsvToJson');

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

