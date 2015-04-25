/**
 * Created by hyunwoo on 2015-04-23.
 */
/**
 * Created by hyunwoo on 2015-04-22.
 */
var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');
var eachpagetwitcount = 250;
module.exports = router;

var db = require('redis').createClient(13000, '202.30.24.167', function(err){
    console.log(err);
});

db.select(2);

router.get('/', function (req, res) {
    res.render('projects_layout');
});


router.get('/twittermood/twits', function (req, res) {
    try {
        console.log();
        var selectCountry = req.query.country;
        var page = req.query.page;
        if (page === undefined || isNaN(page)) page = 0;
        if (req.query.country === undefined) selectCountry = 'London';
        var multi = db.multi();
        var result = {};
        result.select = selectCountry;
        result.count = 0;
        result.countries = [];
        result.pagecount = 0;
        result.currentpage = page;
        multi.select(2)
            .hgetall('infos')
            .hget('infos', selectCountry)
            .exec(function (err, rep) {
                if (rep[2] != null)
                    result.count = rep[2];
                var keys = Object.keys(rep[1]);


                for (var i = 1; i < keys.length; i++) {
                    result.countries.push(
                        {
                            name: keys[i],
                            value: rep[1][keys[i]],
                        }
                    )
                }


                var multi = db.multi();
                multi.zrevrange('location:' + selectCountry, 0 + eachpagetwitcount * page, eachpagetwitcount - 1 + eachpagetwitcount * page);
                multi.zcount('location:' + selectCountry, '-inf', 'inf');
                multi.exec(function (err, rep) {
                    if (err) {
                        console.log(err);
                        return;
                    }


                    result.pagecount = Math.ceil((rep[1] * 1) / eachpagetwitcount);
                    console.log('page : ' + result.pagecount)
                    var multi = db.multi();
                    multi.select(1);
                    for (var i = 0; i < rep[0].length; i++) {
                        var key = rep[0][i];
                        multi.hgetall(key);
                    }
                    multi.exec(function (err, rep) {
                        if (err ) {
                            console.log(err);
                            res.redirect('/');
                        }


                        var twits = [{
                            Text: selectCountry + " twits",
                            Date: ' ',
                            User: 'System',
                            values: [],
                        }];



                        for (var j = 1; j < rep.length; j++) {
                            var isNew = true;
                            var current = parseTwitDate(rep[j].date);
                            for (var k = 0; k < twits[0].values.length; k++) {

                                var eachDate = twits[0].values[k].Date;
                                if (eachDate === current) {
                                    isNew = false;

                                    twits[0].values[k].values.push({
                                        Text: rep[j].text,
                                        User: rep[j].user_scr_name,
                                        Date: rep[j].date,
                                    });
                                    break;
                                }

                            }
                            if (isNew) {
                                twits[0].values.push({
                                    Text: ' ',
                                    User: 'System',
                                    Date: current,
                                    values: []
                                })
                            }

                        }
                        stringifyTwit = JSON.stringify(twits);
                        result.twits = stringifyTwit;

                        res.render('projects/twittermood/twittermood_indentedtree', result);
                    })
                })


            })
    } catch(e){
        console.log(e);
        res.redirect('/');
    }
});
function parseTwitDate(date){
    try {
        var eachs = date.split(' ');
        return eachs[eachs.length - 1] + '.' + eachs[1] + '.' + eachs[2] + ' ' + eachs[3].split(':')[0];
    }catch (e){
        return ' ';
    }
}

router.get('/twittermood/weatherdata', function (req, res){
    res.render('twittermood/twittermood_worldmap');
});


router.get('/twittermood/worldmap', function (req, res){
    res.render('projects/twittermood/twittermood_worldmap');
});




