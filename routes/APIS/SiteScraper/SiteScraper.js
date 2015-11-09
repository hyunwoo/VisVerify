/**
 * Created by Luan on 15. 11. 9..
 */
var express = require('express');
var router = express.Router();
var request = require('request').defaults({maxRedirects: 25});
var cheerio = require("cheerio");
var Iconv = require('iconv').Iconv;
var iconvlite = require('iconv-lite');
iconvlite.extendNodeEncodings();
var iconv = new Iconv('euc-kr', 'UTF-8//TRANSLIT//IGNORE');
var jsdom = require('jsdom');
var request = require('request');
var url = require('url');


extractor = require('unfluff');

module.exports = router;
var sitedata = require('./data');
var lda = require('../../../functions/LDA');

router.get('/', function (req, res) {
    console.log("in new projects");
    res.render('apis/scraper/sitescraper');

});

router.get('/scrap', function(req,res){
    var site ;
    if(req.url.indexOf('?url=') == -1){
        res.send({
            success : false,
        });
        return;
    } else {
        site = req.url.split('scrap?url=')[1];
    }

    console.log(site);
    console.log(site);
    if(site === undefined){
        res.send({
            success : false,
        });
        return;
    }
    //var site = 'http://news.naver.com/main/read.nhn?oid=014&sid1=100&aid=0003537578&mid=shm&cid=428288&mode=LSD&nh=20151108223637';
    request(site, {encoding: null},
        function (error, response, text) {
            if (!error && response.statusCode == 200) {
                var body = iconv.convert(text).toString();
                var $ = cheerio.load(body);
                var isSet = null;
                for(var i = 0 ; i < sitedata.SiteData.length ; i ++){
                    if(site.indexOf(sitedata.SiteData[i].site) != -1){
                        isSet = sitedata.SiteData[i];
                        break;
                    }
                }
                var result = {};
                var data = extractor.lazy(body, 'en');
                if(isSet != null){
                    console.log("SET!");
                    result.head = $(isSet.head).text();
                    result.body = $(".article").text();
                    result.setter = isSet.site;
                } else {
                    result.head = data.title();
                    result.body = data.text();
                    result.setter = "DEFAULT";
                }
                result.images = data.image();
                result.videos = data.videos();
                result.success = true;
                res.send( JSON.stringify(result,null,4));
            }
        });
})



router.get('/api/lda', function (req, res) {
    var category_count = req.query.category;
    var topic_count = req.query.topic;
    var site = req.query.site;
    var document = req.query.document;

    console.log(site);

    var options = {
        url: 'http://www.nytimes.com/2015/11/08/world/middleeast/as-us-escalates-air-war-on-isis-allies-slip-away.html',
        maxRedirects: '10',
        headers: {
            'User-Agent': 'request'
        }
    };


    res.send('site');
    return;
})
