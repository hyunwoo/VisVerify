/**
 * Created by hyunwoo on 2015-05-04.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');
var utf8 = require('utf8');

var csvParser = require('../functions/CsvToJson');
var defaultFunc = require('../functions/defaultFunctions');
var stemmer = require('stemmer');
var sentenceSeperator = require('sentence-tokenizer');

module.exports = router;

var Twitter = require('twitter-node-client').Twitter;


var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var Twitter = require('twitter-node-client').Twitter;

//Get this data from your twitter apps dashboard
var config = {
    "consumerKey": "VvZ6BUZSxuhGA9utbQm1fMpzt",
    "consumerSecret": "khWNvcOWaS86CnL2M3XkR7Oct2kFegYg1xz8YP1oXz7ikzeyqJ",
    "accessToken": "179702971-Y9A7ldO1hryKJHWZm8Ry0z3YKfgxoPGQlCYDsBGD",
    "accessTokenSecret": "SNmNury4oboQ6MpMrm9bseN4GLnrjy9zrUMftxPlPDPnF",
    "callBackUrl": ""
}

var twitter = new Twitter(config);


var kingsName = {};
csvParser.Parse('./ProjectData/joseondynasty/kingsname.csv', function (data) {
    for (var i = 0; i < data.length; i++) {
        kingsName[data[i].key] = data[i].name;
        kingsName[data[i].name] = data[i].key;
    }
});


router.get('/', function (req, res) {
    res.render('apis');
});

router.get('/sentence_seperator', function (req, res) {

})

router.get('/docs/joseondynasty', function (req, res) {
    res.render('api/joseondynasty/joseondynasty_api');
})

var each_page_data_count = 100;

var lda = require('../functions/LDA');


router.post('/textanalysis/lda', function (req, res) {
    console.log('in lda');
    var document = req.body.input;
    console.log(req.body);
    var lda_output = lda.topics(document, 10, 5);

    var outString = '';
    for (var i in lda_output) {
        var row = lda_output[i];
        outString += 'Topic ' + (parseInt(i) + 1) + '\n';
        // For each term.
        for (var j in row) {
            var term = row[j];
            outString += term.term + ' (' + term.probability + '%)';
        }

        outString += '\n';
    }
    console.log(outString);
    res.send(outString);
})


router.get('/twitter/search', function (req, res) {
    var q = req.query.q;
    var date = req.query.date;
    var page = req.query.page;
    var onlyDate = req.query.oneday;
    if (onlyDate === undefined) onlyDate = false;
    else {
        if (onlyDate === false) onlyDate = false;
        else onlyDate = true;
    }

    var mode = req.query.mode;
    if (mode === undefined) {
        mode = 'recent'
    } else if (mode == 'popular') {
        mode = 'popular';
        page = 1;
    } else {
        mode = 'recent';
    }
    var starttime = defaultFunc.getDateDetailNoDot();

    if (page === undefined) page = 1;
    if (page * 1 > 10) page = 10;

    var day = '';
    var query = q + ' ';

    if (date !== undefined) {
        var date_t = date.split('-');

        if (date_t.length != 3) {
            res.send({
                'success': false,
                'err': 'parameter err [ Date : ' + date + ' ]',
            })
            return;
        }
    } else onlyDate = false;

    if (date !== undefined) {
        query = q + ' ' + 'until:' + date;
        if (date_t[2] != null || date_t[2] !== undefined) {
            day = date.split('-')[2];
        }
    }

    var result = {
        success: true,
        count: 0,
        tweets: [],
    }
    var recursiveCount = 0;
    var error = function (err, response, body) {
        var result = {};
        result.success = false;
        result.err = err;
        result.body = body;
        res.send(result);
    };

    var success = function (data) {

        recursiveCount++;
        var json = JSON.parse(data);
        for (var i = 0; i < json.statuses.length; i++) {
            var tweet = json.statuses[i];
            var d = {
                text: tweet.text,
                time: tweet.created_at,
                user: tweet.user.screen_name,

            }

            if (onlyDate) {
                var check = d.time.split(' ')[2] * 1;
                if (check * 1 != day * 1 - 1) {

                    res.send(result);
                    return;
                }
            }
            result.count++;
            result.tweets.push(d);
        }

        if (recursiveCount == 5) { // finish
            res.send(result);
            return;
        }

        try {
            var max_id = json.search_metadata.next_results.split('&')[0].split('=')[1];
            twitter.getSearch({
                'q': query,
                'max_id': max_id,
                'count': 100,
                'result_type': mode,
                'lang': 'en'
            }, error, success);
        } catch (e) {
            res.send(result);
            return;
        }
    };

    twitter.getSearch({
        'q': query,
        'max_id': '',
        'count': 100,
        'result_type': mode,
        'lang': 'en'
    }, error, success);
})

router.get('/twitter/searchDate', function (req, res) {

})
router.get('/twitter/infos', function (req, res) {
    res.send("asdf");
    res.end();

})

function sendFailedResult(res) {
    res.send(['FAILED']);
    res.end();
}
