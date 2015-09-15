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
var sort = require('javascript-natural-sort');






var csvParser = require('../functions/CsvToJson');

var sentiment = require('../functions/SentimenAnalsys');
var defaultFunc = require('../functions/defaultFunctions');


module.exports = router;


var lda = require('../functions/LDA');
var db = require('redis').createClient(13000, '202.30.24.169');

/*
 db 1 : twit
 db 2 : twit infos
 db 3 : dictionary
 db 4 : weather infos
 db 5 : sentiment analsys
 db 6 : temp dic
  */

var joseon_dynasty_db = require('redis').createClient(13001, '202.30.24.169');



router.get('/', function (req, res) {
    res.render('projects_layout');
});


router.get('/topicnetwork/lda', function (req, res) {
    res.render('projects/topicnetwork/topicnetwork_lda')
})

router.get('/topicnetwork/twitViewer', function(req,res){
    db.select(2, function(err){
        db.keys('infos:time:*',function(err,rep){
            var keys =rep.sort(sort);
            var location = 'Philippines';
            console.log(keys[205]);
            var time = keys[210].split(':')[2];
            var key = 'location:' + location + ':' + time;
            console.log(key);
            db.zrange(key, 0, -1 , function(err,rep){
                var multi = db.multi();
                multi.select(1);
                for(var i = 0 ; i < rep.length ; i ++){
                    multi.hgetall(rep[i]);
                }
                multi.exec(function(err,rep){
                    var document = '';
                    for(var i = 1 ; i < rep.length ; i++) {
                        document += rep[i].text + '\n';
                        //console.log(rep[i].text);
                        //console.log(' --- ');
                    }
                    console.log(document);
                    var lda_output = lda.topics(document, 5, 5);
                    console.log(lda_output);
                    var result = {};
                    res.render('projects/topicnetwork/topicnetwork_twitterTopics', result)
                })
            })
        })
    });
})



router.post('/topicnetwork/lda', function (req, res) {
    console.log(req.body);
    var category_count = req.body.category;
    var topic_count = req.body.topic;
    var document = req.body.document;


    if (category_count === '') category_count = 2;
    else category_count *= 1;
    if (topic_count === '') topic_count = 5;
    else topic_count *= 1;

    var result = {
        error: "OK",
        output: {
            topics: [],
        },
        data: document,
        topic_count: topic_count,
        category_count: category_count,
        default_data: '',
        network_data: '',
        network_connection: ''

    };
    if (document === undefined || document === '') {
        result.error = 'NODATA';
        res.render('projects/topicnetwork/topicnetwork_lda', result)
        return;
    } else {
        var lda_output = lda.topics(document, topic_count, category_count);
        if (lda_output == null) {
            result.error = 'NODATA';
            res.render('projects/topicnetwork/topicnetwork_lda', result)
            return;
        }

        var data = [];
        var network_data_origin = []
        var network_data = [];
        var network_connection = [];

        for (var i in lda_output) {
            var row = lda_output[i];
            var str = '';
            var group = 'Topic ' + (parseInt(i) + 1);
            str += group + '\n';

            // For each term.
            var saved_term = '';
            for (var j in row) {
                console.log(j);
                var term = row[j];
                var value = ((term.probability * 10).toFixed(2));
                str += term.term + ' (' + value + ')\n';


                data.push({
                    value: value * 200,
                    name: term.term,
                    group: group,
                })
                if (network_data_origin[term.term] == null) {
                    network_data_origin[term.term] = value * 100;
                } else network_data_origin[term.term] += value * 100;


                if (j * 1 != 0) {
                    network_connection.push({
                        source: term.term,
                        target: saved_term
                    })
                } else {
                    saved_term = term.term;
                }


            }
            result.output.topics.push(str);

        }


        var keys = Object.keys(network_data_origin);
        for (var i = 0; i < keys.length; i++) {
            network_data.push({
                name: keys[i],
                size: network_data_origin[keys[i]],
            })
        }

        console.log("NETWORK : ", network_data);
        console.log("NETWORK CONNECTION: ", network_connection);
        result.default_data = JSON.stringify(data);
        result.network_data = JSON.stringify(network_data);
        result.network_connection = JSON.stringify(network_connection);
        console.log(result.output.topics);


        res.render('projects/topicnetwork/topicnetwork_lda', result)
    }


})

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

router.get('/logonetwork/circularParellar', function (req, res) {
    var result = {};
    result.tab = 'projects';

    var total_data = {keys: []};
    var result = {};
    csvParser.Parse('./ProjectData/Logo/logo_data3_2.csv', function (object) {

        for (var i = 0; i < object.length; i++) {
            total_data[object[i].name] = object[i];
            if (object[i].name != 'max' && object[i].name != 'node_color' &&
                object[i].name != 'cat' && object[i].name != 'idx_name' && object[i].name != 'idx_name_korean')
                total_data.keys.push(object[i].name);
        }
        console.log(total_data.keys);
        console.log(total_data['max'].arg1)


        result.default_data = JSON.stringify(total_data);
        res.render('projects/logonetwork/logonetwork_circularParellar', result);
    });

})

router.post('/logonetwork/circularParellar', function (req, res) {
    try {
        var result = {};
        result.tab = 'projects';
        var total_data = {keys: []};
        console.log(req.body.data);

        csvParser.ParseString(req.body.data, function (object) {
            console.log(object);
            for (var i = 0; i < object.length; i++) {
                total_data[object[i].name] = object[i];
                if (object[i].name != 'max' && object[i].name != 'node_color' &&
                    object[i].name != 'cat' && object[i].name != 'idx_name' && object[i].name != 'idx_name_korean')
                    total_data.keys.push(object[i].name);
            }
            result.default_data = JSON.stringify(total_data);
            result.success = true;
            res.render('projects/logonetwork/logonetwork_circularParellar', result);
        });
    } catch (e) {

        var result = {};
        result.tab = 'projects';

        var total_data = {keys: []};
        var result = {};
        csvParser.Parse('./ProjectData/Logo/logo_data3_2.csv', function (object) {

            for (var i = 0; i < object.length; i++) {
                total_data[object[i].name] = object[i];
                if (object[i].name != 'max' && object[i].name != 'node_color' &&
                    object[i].name != 'cat' && object[i].name != 'idx_name' && object[i].name != 'idx_name_korean')
                    total_data.keys.push(object[i].name);
            }
            console.log(total_data.keys);
            console.log(total_data['max'].arg1)


            result.default_data = JSON.stringify(total_data);
            result.success = false;
            res.render('projects/logonetwork/logonetwork_circularParellar', result);
        });
    }

})

router.get('/sementicnode', function(req,res){
    var result = {};
    result.tab = 'projects';
    result.unuseHeadImage = true;
    res.render('projects/SementicNode/sementicnode_intro', result);
})

router.get('/sementicnode/viewer', function(req,res){
    var result = {};
    result.tab = 'projects';
    result.unuseHeadImage = true;
    res.render('projects/SementicNode/sementicnode_viewer', result);
})

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
router.get('/twittermood/russells_model', function(req,res){
    res.render('projects/twittermood/twittermood_viewer');
})
router.get('/twittermood/multi_country', function (req, res) {
    var result = {};
    result.tab = 'projects';

    var input_city = req.query.city1;
    var input_city_2 = req.query.city2;
    var city = 'Singapore';
    if (input_city === undefined || input_city == null)
        city = "Singapore";
    else city = input_city;

    var city2 = "New York";
    if (input_city_2 === undefined || input_city_2 == null)
        city2 = "New York";
    else city2 = input_city_2;


    var multi = db.multi();
    multi.select(4);
    multi.hkeys("Progress");
    multi.hkeys("Cities");


    result.select1 = city;
    result.select2 = city2;

    multi.exec(function (err, rep) {
        if (err != null) {
            res.render('projects/twittermood/twittermood_weatherdata', result);
            return;
        }
        var keys = rep[1].sort(sort);
        result.cities = rep[2];
        multi = db.multi();
        multi.select(4);
        for (var i = 0; i < keys.length; i++) {
            multi.hgetall("weather:" + city + ":" + keys[i]);
        }

        for (var i = 0; i < keys.length; i++) {
            multi.hgetall("weather:" + city2 + ":" + keys[i]);
        }

        multi.exec(function (err, rep) {
            if (err != null) {
                res.render('projects/twittermood/twittermood_multi_country', result);
                return;
            }
            var default_data = [];
            var second_data = [];


            var max = 0;
            /** for nvd3 */
            var temperature = {
                values: [],
                key: "temp " + city,
                color: "#2ca0ff"
            };
            var humidity = {
                values: [],
                key: "humidity " + city,
                color: '#2ca02c'
            }

            var wind = {
                values: [],
                key: "wind " + city,
                color: '#7777ff',
            }

            var rain = {
                values: [],
                key: "rain " + city,
                color: "#ff8f0e"
            }
            var uncomf = {
                values: [],
                key: "uncomf " + city,
                color: "#ff0000"
            }


            // 2
            var temperature2 = {
                values: [],
                key: "temp " + city2,
                color: "#2ca0ff"
            };
            var humidity2 = {
                values: [],
                key: "humidity " + city2,
                color: '#2ca02c'
            }

            var wind2 = {
                values: [],
                key: "wind " + city2,
                color: '#7777ff',
            }

            var rain2 = {
                values: [],
                key: "rain " + city2,
                color: "#ff8f0e"
            }
            var uncomf2 = {
                values: [],
                key: "uncomf " + city2,
                color: "#ff0000"
            }


            var group1_length = (rep.length - 1) / 2 + 1;
            var group2_length = rep.length;

            for (var j = 1; j < group1_length; j++) {
                temperature.values.push({x: j, y: rep[j].temp * 1});
                humidity.values.push({x: j, y: rep[j].humidity * 1});
                wind.values.push({x: j, y: rep[j].wind_speed * 1});
                rain.values.push({x: j, y: rep[j].rain == 'undefined' ? 0 : rep[j].rain * 1});

//                9/5Ta-0.55(1-RH)(9/5Ta-26)+32
                var uncomf_value = 9 * 0.2 * rep[j].temp - 0.55 * ( 1 - rep[j].humidity * 0.01) * (9 * 0.2 * rep[j].temp - 26) + 32;
                uncomf.values.push({x: j, y: uncomf_value * 1});


            }

            for (var j = group1_length; j < group2_length; j++) {
                var index = j - group1_length;
                temperature2.values.push({x: index, y: rep[j].temp * 1});
                humidity2.values.push({x: index, y: rep[j].humidity * 1});
                wind2.values.push({x: index, y: rep[j].wind_speed * 1});
                rain2.values.push({x: index, y: rep[j].rain == 'undefined' ? 0 : rep[j].rain * 1});
                var uncomf_value = 9 * 0.2 * rep[j].temp - 0.55 * ( 1 - rep[j].humidity * 0.01) * (9 * 0.2 * rep[j].temp - 26) + 32;
                uncomf2.values.push({x: index, y: uncomf_value * 1});

            }

            default_data.push(temperature);
            default_data.push(humidity);
            default_data.push(wind);
            default_data.push(rain);
            default_data.push(uncomf);

            default_data.push(temperature2);
            default_data.push(humidity2);
            default_data.push(wind2);
            default_data.push(rain2);
            default_data.push(uncomf2);


            multi = db.multi();
            multi.select(5);
            for (var i = 0; i < keys.length; i++) {
                multi.hgetall("sentiment:" + city + ":" + keys[i]);
            }

            for (var i = 0; i < keys.length; i++) {
                multi.hgetall("sentiment:" + city2 + ":" + keys[i]);
            }


            multi.exec(function (err, rep) {

                var sentivalues = {
                    values: [],
                    key: "sentiment " + city,
                    color: "#ff8f0e",
                }

                var sentivalues2 = {
                    values: [],
                    key: "sentiment " + city2,
                    width: 3,
                    color: "#8fff0e",
                }

                var group1_length = (rep.length - 1) / 2 + 1;
                var group2_length = rep.length;
                for (var j = 1; j < group1_length; j++) {
                    //console.log(rep[j]);
                    var idx = j - 1;
                    if (rep[j] == null) continue;
                    sentivalues.values.push({x: idx, y: rep[j].aver * 10});

                    var jump_count = 50;
                    for (var i = -100; i < 100; i += jump_count) {
                        var val = 0;
                        for (var k = i; k < i + jump_count; k++) {
                            if (k == 0) continue;

                            val += rep[j][k + ''] == undefined ? 0 : rep[j][k + ''] * 1;
                        }
                        var data = {
                            idx: j,
                            name: i + ' ~ ' + (i * 1 + jump_count),
                            value: val,
                        }
                        second_data.push(data);
                    }
                }

                for (var j = group1_length; j < group2_length; j++) {
                    //console.log(rep[j]);

                    if (rep[j] == null) continue;
                    var idx = j - group1_length;
                    sentivalues2.values.push({x: idx, y: rep[j].aver * 10});


                    var jump_count = 50;
                    for (var i = -100; i < 100; i += jump_count) {
                        var val = 0;
                        for (var k = i; k < i + jump_count; k++) {
                            if (k == 0) continue;

                            val += rep[j][k + ''] == undefined ? 0 : rep[j][k + ''] * 1;
                        }
                        var data = {
                            idx: j,
                            name: i + ' ~ ' + (i * 1 + jump_count),
                            value: val,
                        }
                        second_data.push(data);
                    }
                }
                default_data.push(sentivalues2);
                default_data.push(sentivalues);
                result.default_data = JSON.stringify(default_data);
                //result.second_data = JSON.stringify(second_data);
                res.render('projects/twittermood/twittermood_multi_country', result);


            })
            /** for d3plus */


        })
    })

})


router.get('/twittermood/graphs', function (req, res) {
    var result = {};
    result.tab = 'projects';

    var input_city = req.query.city1;
    var city = 'Singapore';
    if (input_city === undefined || input_city == null)
        city = "Singapore";
    else city = input_city;


    var multi = db.multi();
    multi.select(4);
    multi.hkeys("Progress");
    multi.hkeys("Cities");


    result.select1 = city;

    multi.exec(function (err, rep) {
        if (err != null) {
            res.render('projects/twittermood/twittermood_weatherdata', result);
            return;
        }
        var keys = rep[1].sort(sort);
        result.cities = rep[2];
        multi = db.multi();
        multi.select(4);
        for (var i = 0; i < keys.length; i++) {
            multi.hgetall("weather:" + city + ":" + keys[i]);
        }


        multi.exec(function (err, rep) {
            if (err != null) {
                res.render('projects/twittermood/twittermood_weatherdata', result);
                return;
            }
            var default_data = [];
            var second_data = [];


            var max = 0;
            /** for nvd3 */
            var temperature = {
                values: [],
                key: "temp",
                color: "#2ca0ff"
            };
            var humidity = {
                values: [],
                key: "humidity",
                color: '#2ca02c'
            }

            var wind = {
                values: [],
                key: "wind",
                color: '#7777ff',
            }

            var rain = {
                values: [],
                key: "rain",
                color: "#ff8f0e"
            }
            var snow = {
                values: [],
                key: "snow",
                color: "#ff0000"
            }


            for (var j = 1; j < rep.length; j++) {
                temperature.values.push({x: j, y: rep[j].temp * 1});
                humidity.values.push({x: j, y: rep[j].humidity * 1});
                wind.values.push({x: j, y: rep[j].wind_speed * 1});
                rain.values.push({x: j, y: rep[j].rain == 'undefined' ? 0 : rep[j].rain * 1});

            }
            console.log(rep);


            default_data.push(temperature);
            default_data.push(humidity);
            default_data.push(wind);
            default_data.push(rain);
            multi = db.multi();
            multi.select(5);
            for (var i = 0; i < keys.length; i++) {
                multi.hgetall("sentiment:" + city + ":" + keys[i]);
            }
            multi.exec(function (err, rep) {

                var sentivalues = {
                    values: [],
                    key: "sentiment",
                    color: "#ff8f0e",
                    area: true,
                }

                for (var j = 1; j < rep.length; j++) {
                    //console.log(rep[j]);
                    if (rep[j] == null) continue;
                    sentivalues.values.push({x: j, y: rep[j].aver * 10});

                    var jump_count = 50;
                    for (var i = -100; i < 100; i += jump_count) {
                        var val = 0;
                        for (var k = i; k < i + jump_count; k++) {
                            if (k == 0) continue;

                            val += rep[j][k + ''] == undefined ? 0 : rep[j][k + ''] * 1;
                        }
                        var data = {
                            idx: j,
                            name: i + ' ~ ' + (i * 1 + jump_count),
                            value: val,
                        }
                        second_data.push(data);
                    }
                }
                default_data.push(sentivalues);
                result.default_data = JSON.stringify(default_data);
                result.second_data = JSON.stringify(second_data);
                res.render('projects/twittermood/twittermood_single_country', result);


            })
            /** for d3plus */


        })
    })

})
router.get('/twittermood/worldmap', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects/twittermood/twittermood_worldmap', result);
});
router.get('/twittermood/sentiment', function (req, res) {
    var result = {};
    result.tab = 'projects';
    result.countries = [];
    var select = req.params.country;
    var page = req.params.page;

    console.log("param page : " + page);

    var multi = db.multi();

    multi.select(4);
    multi.hkeys('Cities');
    multi.exec(function (err, rep) {
        result.countries = rep[1];
        if (select === undefined || select == '')
            result.select = rep[1][0];
        else result.select = select;

        multi = db.multi();
        multi.select(4);
        multi.hkeys('Progress');
        var city = result.select;
        multi.exec(function (err, rep) {
            multi = db.multi();
            multi.select(2);
            if (page === undefined || page == '')
                result.currentpage = 0;
            else result.currentpage = page;
            console.log("Cur PAge : " + result.currentpage);

            multi.zrange("location:" + city + ":" + rep[1][result.currentpage], 0, -1);
            console.log('pageLength : ' + rep[1].length);
            result.pagecount = rep[1].length;

            multi.exec(function (err, rep) {
                multi = db.multi();
                multi.select(1);
                for (var i = 0; i < rep[1].length; i++) {
                    multi.hgetall(rep[1][i]);
                }
                result.tweets = [];
                multi.exec(function (err, rep) {
                    for (var i = 1; i < rep.length; i++) {
                        var sent = sentiment.sentiment(rep[i].text);
                        result.tweets.push({
                            id: rep[i].user_scr_name,
                            text: rep[i].text,
                            sentiment: Math.floor(sent.comparative * 100) / 10,
                        });

                    }

                    res.render('projects/twittermood/twittermood_sentiment', result);
                })
            })
        })


    })

})
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




