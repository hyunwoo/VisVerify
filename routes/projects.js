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
var iconv = require('iconv-lite');
iconv.extendNodeEncodings();
var eachpagetwitcount = 500;
var joseondynasity_eachcount = 100;
var utf8 = require('utf8');


var csvParser = require('../functions/CsvToJson');

var sentiment = require('../functions/SentimenAnalsys')
var defaultFunc = require('../functions/defaultFunctions');



module.exports = router;




var db = require('redis').createClient(13000, '202.30.24.169');
var joseon_dynasty_db = require('redis').createClient(13001, '202.30.24.169');

db.select(2);


var multi = db.multi();

multi.select(2);
multi.zrevrange('location:London', 0 , -1);
multi.exec(function(err,rep){
    var multi = db.multi();
    multi.select(1);
    for(var i = 0 ; i < rep[1].length ; i ++){
        multi.hgetall(rep[1][i]);
    }
    multi.exec(function(err,rep){
        for(var i = 1 ; i < rep.length ; i ++) {
            defaultFunc.twitDataToNormalDate(rep[i].date)
            //console.log(rep[i].date)
            //sentiment.sentiment(rep[i].text);
        }
        //console.log(rep);
    })
})



router.get('/', function (req, res) {
    res.render('projects_layout');
});

var kingsName = {};
csvParser.Parse('./ProjectData/joseondynasty/kingsname.csv', function (data) {
    for (var i = 0; i < data.length; i++) {
        kingsName[data[i].key] = data[i].name;
        kingsName[data[i].name] = data[i].key;
    }
});

router.get('/joseondynasty', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects_layout', result);
});

router.get('/joseondynasty/data', function (req, res) {
    var multi = joseon_dynasty_db.multi();

    var input_kingname = req.query.king;
    var input_page = req.query.page;

    if (input_kingname === undefined) input_kingname = 'a';
    else input_kingname = kingsName[input_kingname];
    if (input_page === undefined) input_page = 0;
    var result = {};
    result.select = kingsName[input_kingname];
    result.count = 0;
    result.kings = [];
    result.pagecount = 0;
    result.currentpage = input_page;
    result.tab = 'project';

    multi.select(2);
    multi.smembers('King:' + input_kingname);
    multi.select(0);
    multi.hgetall('Kings');
    multi.exec(function (err, rep) {
        if (err) res.redirect('projects');
        var multi = joseon_dynasty_db.multi();
        var kings = Object.keys(rep[3]);
        for (var i = 0; i < kings.length; i++) {
            console.log(kingsName[kings[i]])
            result.kings.push({
                name: kingsName[kings[i]],
                value: rep[3][kings[i]]
            })
        }
        console.log(rep[1].length);
        multi.select(2);
        for (var i = input_page * joseondynasity_eachcount; i < (input_page * 1 + 1) * joseondynasity_eachcount; i++) {
            if (rep[1][i] !== undefined)
                multi.hgetall('Doc:' + rep[1][i]);
        }
        result.count = rep[1].length * 1;
        result.pagecount = Math.ceil(( rep[1].length * 1) / joseondynasity_eachcount);
        multi.exec(function (err, rep) {
            var twits = [{
                Sector: '-',
                Text: result.select,
                Date: 'a',
                User: 'System',
                values: [],
            }];

            var string = JSON.stringify(rep, "utf-8");
            for (var i = 1; i < rep.length; i++) {
                var isPush = false;
                var sectors = rep[i].sector.split('/');
                for (var k = 0; k < sectors.length; k++) {
                    sectors[k] = sectors[k].replace(/ /gi, '');
                }
                for (var j = 0; j < twits[0].values.length; j++) {
                    for (var k = 0; k < sectors.length; k++) {
                        if (twits[0].values[j].Sector == sectors[k]) {
                            isPush = true;
                            twits[0].values[j].values.push({
                                Sector: '',
                                Text: rep[i].body,
                                Date: '-',
                                User: 'System',
                            })
                        }
                    }

                }
                if (!isPush) {
                    for (var k = 0; k < sectors.length; k++) {
                        twits[0].values.push({
                            Sector: sectors[k],
                            Text: sectors[k],
                            Date: '-',
                            User: 'System',
                            values: [{
                                Sector: '',
                                Text: rep[i].body,
                                Date: '-',
                                User: 'System',
                            }]
                        })
                    }

                }

            }
            console.log(string);
            result.twits = JSON.stringify(twits, encoding = 'utf8').replace(/&middot;/gi, '').replace(/&lsquo;/gi, '<').replace(/&rsquo;/gi, '>');
            res.render('projects/joseondynasty/joseondynasty_data', result);
        })
    })
});

router.get('/joseondynasty/eachkingStackGraph', function (req, res) {

    var input_kingname = req.query.king;

    if (input_kingname === undefined) input_kingname = 'a';
    else input_kingname = kingsName[input_kingname];
    var result = {};
    result.default_data = '';
    var multi = joseon_dynasty_db.multi();

    result.select = kingsName[input_kingname];
    result.count = 0;
    result.kings = [];
    result.tab = 'projects';

    multi.select(1);
    var key = "KingTendency:" + input_kingname;
    multi.zrevrange(key, 0, -1, 'withscores');
    multi.select(0);
    multi.hgetall('Kings');
    multi.exec(function (err, rep) {
        if (err) {
            res.redirect('/');
            return;
        }

        var total = 0;
        var keys = Object.keys(rep[3]);
        for (var i = 0; i < keys.length; i++) {
            result.kings.push({
                name: kingsName[keys[i]],
                value: rep[3][keys[i]],
            })
        }


        for (var i = 0; i < rep[1].length; i += 2) total += rep[1][i + 1] * 1;


        var default_data = {
            name: result.select,
            children: [],
        };

        var index = 0;
        for (var i = 0; i < rep[1].length; i += 2) {
            var key = rep[1][i].split('(')[0];
            var keys = key.split('-');
            var firstkey = keys[0].replace('*', '');
            var secondkey = undefined;
            if (keys.length > 1)  secondkey = keys[1];


            if (secondkey === undefined) secondkey = 'ETC';
            var isPush = true;
            for (var j = 0; j < default_data.children.length; j++) {

                if (default_data.children[j].name == firstkey) {
                    isPush = false;
                    default_data.children[j].children.push({
                        name: secondkey,
                        size: rep[1][i + 1]
                    });
                    break;
                }
            }
            // generate
            index++;
            if (isPush) {
                default_data.children.push({
                    name: firstkey,
                    index: index,
                    children: [{
                        name: secondkey,
                        size: rep[1][i + 1]
                    }]
                });
            }

        }
        result.count = total;
        result.default_data = JSON.stringify(default_data, null, 4);
        res.render('projects/joseondynasty/joseondynasty_stack', result);
    })

});

router.get('/joseondynasty/eachking', function (req, res) {

    var input_kingname = req.query.king;

    if (input_kingname === undefined) input_kingname = 'a';
    else input_kingname = kingsName[input_kingname];

    var result = {};
    result.default_data = '';
    var multi = joseon_dynasty_db.multi();

    result.select = kingsName[input_kingname];
    result.count = 0;
    result.kings = [];
    result.tab = 'projects';
    multi.select(1);
    var key = "KingTendency:" + input_kingname;
    console.log(key);
    multi.zrevrange(key, 0, -1, 'withscores');
    multi.select(0);
    multi.hgetall('Kings');
    multi.exec(function (err, rep) {
        if (err) {
            res.redirect('/');
            return;
        }
        console.log(rep[3]);
        var default_data = [];
        var total = 0;
        var keys = Object.keys(rep[3]);
        for (var i = 0; i < keys.length; i++) {
            console.log(kingsName[keys[i]]);
            result.kings.push({
                name: kingsName[keys[i]],
                value: rep[3][keys[i]],
            })
        }


        for (var i = 0; i < rep[1].length; i += 2) total += rep[1][i + 1] * 1;

        for (var i = 0; i < rep[1].length; i += 2) {
            if (rep[1][i + 1] * 1 > total * 0.025) {
                default_data.push({
                    label: rep[1][i].replace(/\*/gi, ''),
                    value: rep[1][i + 1],
                    percent: rep[1][i + 1] / total * 100
                })
            }
        }
        result.count = total;
        result.default_data = JSON.stringify(default_data, null, 4);
        res.render('projects/joseondynasty/joseondynasty_eachking', result);
    })

});

router.get('/joseondynasty/graph', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects/joseondynasty/joseondynasty_graph', result);
});

router.get('/joseondynasty/network', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects/joseondynasty/joseondynasty_network');
});

router.get('/logonetwork', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects_layout', result);
});

router.get('/logonetwork/multicamera', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects/logonetwork/logonetwork_multicamera', result);
})

router.get('/logonetwork/filterednetwork', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects/logonetwork/logonetwork_filtered', result);
})

router.get('/logonetwork/prototype01', function (req, res) {
    var result = {};
    result.tab = 'projects';

    try {
        csvParser.Parse('./ProjectData/Logo/logo_data01.csv', function (object) {
            var data = require('../functions/CsvtoNetworkJSON').CsvToD3JSJSON(object, function (same, max) {
                var result = Math.pow((same / max), 0.5);
                if (result > 0.46) return result
                else return 0;
            });
            result.default_data = JSON.stringify(data, null, 4);
            res.render('projects/logonetwork/logonetwork_prototype', result);
        })


    } catch (e) {
        console.log(e);
        res.redirect('projects');
    }

})

router.get('/logonetwork/prototype02', function (req, res) {
    var result = {};
    result.tab = 'projects';
    try {
        csvParser.Parse('./ProjectData/Logo/logo_data01.csv', function (object) {
            var data = require('../functions/CsvtoNetworkJSON').CsvToSigmaJSON(object, function (same, max) {
                var result = Math.pow((same / max), 0.5);

                if (result < 0.5) return 0;
                return result;
            });
            result.default_data = JSON.stringify(data, null, 4);
            res.render('projects/logonetwork/logonetwork_prototype02', result);
        })


    } catch (e) {
        console.log(e);
        res.redirect('projects');
    }

})

router.get('/twittermood/worldmap', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects/twittermood/twittermood_worldmap', result);
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
        result.tab = 'projects';
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
                        if (err) {
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
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
});
function parseTwitDate(date) {
    try {
        var eachs = date.split(' ');
        return eachs[eachs.length - 1] + '.' + eachs[1] + '.' + eachs[2] + ' ' + eachs[3].split(':')[0];
    } catch (e) {
        return ' ';
    }
}
router.get('/streamgraph', function (req, res) {

    var default_data = fs.readFileSync('./exampleData/nvd3/stackedAreaData.json');
    var deliver = {};
    deliver.tab = 'projects';

    deliver.default_data = JSON.stringify(JSON.parse(default_data), null, 4)
    res.render('visualization_jade/visual_streamgraph', deliver);
});

router.get('/forcedirectedgraph', function (req, res) {
    var default_data = fs.readFileSync('./exampleData/d3js/miserables.json');
    var deliver = {};
    deliver.tab = 'projects';
    deliver.default_data = JSON.stringify(JSON.parse(default_data), null, 4)
    console.log(deliver);
    res.render('visualization_jade/visual_forcedirectedgraph', deliver);
});

router.post('/', function (req, res) {
    var fstream;
    console.log('in upload');
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        //Path where image will be uploaded
        fstream = fs.createWriteStream(__dirname + '/../trash/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            res.redirect('back');           //where to go next
        });
        fstream.on('error', function (e) {
            console.log(e);
        })
    });
});




