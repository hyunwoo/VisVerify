/**
 * Created by hyunwoo on 11/24/15.
 */
var express = require('express');
var router = express.Router();
module.exports = router;

var countMW = 0, countTIME = 0;
var nodes = [];
var edges = [];
var networkData = {
    nodes: {},
    edges: {}
};


var group = {};
var groupCount = {};
var pcorr = require('compute-pcorr');
var kmeans = require('node-kmeans');
var fs = require('fs-extra');


//doProcess();



router.get('/', function (req, res) {
    console.log("in");
    res.render('universe/project/samples/section9/visualization');
})

router.get('/getData', function (req, res) {


})

function doProcess() {


    var matrix = [];
    var origin = [];
    var LineByLineReader = require('line-by-line'),
        reader = new LineByLineReader(__dirname + '/converted.csv'),
        def_reader = new LineByLineReader(__dirname + '/nameconvert.csv');

    var defNames = {};
    var numeric_data = [];

    def_reader.on('line', function (line) {
        var items = line.split('\t');
        defNames[items[1]] = {
            name: items[2],
            category: items[0],
        }

    })
    def_reader.on('end', function (e) {
        reader.on('line', function (line) {
            var data = line.split(',');
            var d = [];
            var o = [];
            for (var i = 2; i < data.length; i++) {
                d.push(Number(data[i]));
            }

            for (var i = 0; i < data.length; i++) {
                o.push(Number(data[i]));
            }
            matrix.push(d);
            origin.push(o);
        })
        reader.on('end', function () {
            console.log('do PCORR')

            var nodes = [];
            var id = 0;
            var group = {};
            var group_count = 15;

            for (var i = 0; i < group_count; i++) {
                numeric_data.push({
                    sex: [],
                    time: [],
                    maxSex: 0,
                    maxTime: 0,
                });
            }

            function getMax(arr) {
                var max = 0;
                for (var i = 0; i < arr.length; i++) {
                    if (max < arr[i]) max = arr[i];
                }
                return max;
            }

            function getSize(arr) {
                var total = 0;
                for (var i = 0; i < arr.length; i++) {
                    total += arr[i];
                }
                return total;
            }

            kmeans.clusterize(matrix, {k: group_count}, function (err, res) {
                // group check
                // do push node
                for (var i = 0; i < res.length; i++) {
                    for (var j = 0; j < res[i].clusterInd.length; j++) {
                        if (group[i] > 30) continue;
                        if (group[i] === undefined) group[i] = 1;
                        else group[i]++;

                        var idx = res[i].clusterInd[j];

                        if (defNames[origin[idx][0]] == null || defNames[origin[idx][0]] === undefined) {
                            continue;
                        }
                        var name = defNames[origin[idx][0]].name;
                        var category = defNames[origin[idx][0]].category;
                        var size = getSize(matrix[idx]);

                        nodes.push({
                            label: name,
                            id: idx,
                            group: i,
                            value: size,
                            category: category,
                            size: Math.random(),
                            isConnect: true,
                        })


                        for (var s = 0; s < 10; s++) {
                            if (numeric_data[i].sex[s] == null)
                                numeric_data[i].sex[s] = 0;
                            else numeric_data[i].sex[s] += origin[idx][s + 2];
                        }


                        for (var t = 0; t < 24; t++) {
                            if (numeric_data[i].time[t] == null)
                                numeric_data[i].time[t] = 0;
                            else numeric_data[i].time[t] += origin[idx][t + 11];
                        }
                    }
                }

                for (var g = 0; g < group_count; g++) {
                    numeric_data[g].maxSex = getMax(numeric_data[g].sex);
                    numeric_data[g].maxTime = getMax(numeric_data[g].time);
                }

                fs.writeFile(__dirname + '/../../../public/lecture/201502/data/nodes.js', 'var nodes = ' + JSON.stringify(nodes, null, 4), function (err) {
                    if (err) throw err;
                    console.log('Node write completed');
                });

                var edges = [];

                for (var i = 0; i < group_count; i++) {
                    for (var j = 0; j < nodes.length; j++) {
                        var temp = 0;
                        for (var k = 0; k < nodes.length; k++) {
                            if (j <= k) continue;

                            if (nodes[j].group === nodes[k].group) {
                                var val = Math.random();
                                if (val < 1 / group[i] * 0.5) {
                                    edges.push({
                                        from: Number(nodes[j].id),
                                        to: Number(nodes[k].id)
                                    })
                                    temp++;
                                    if (temp > 10) break;
                                }
                            }
                        }
                    }
                }


                var pc = pcorr(matrix);

                var nodeCount = 0;

                for (var i = 0; i < pc.length; i++) {
                    for (var j = i + 1; j < pc[i].length; j++) {
                        if (pc[i][j] > 0.94) {
                            nodeCount++;
                            edges.push({
                                from: i,
                                to: j
                            })
                        }
                    }

                }
                console.log(edges.length);

                fs.writeFile(__dirname + '/../../../public/lecture/201502/data/edges.js', 'var edges = ' + JSON.stringify(edges, null, 4), function (err) {
                    if (err) throw err;
                    console.log('Edges write completed');
                });

                fs.writeFile(__dirname + '/../../../public/lecture/201502/data/groupinfo.js', 'var groupinfo = ' + JSON.stringify(numeric_data, null, 4), function (err) {
                    if (err) throw err;
                    console.log('GroupInfo write completed');
                });

            });
        })
    })

}

//makeData();
var limit = 5;
function makeData() {

    var LineByLineReader = require('line-by-line'),
        readerMW = new LineByLineReader(__dirname + '/04_MW.TXT');


    readerMW.on('error', function (line) {

    });

    readerMW.on('line', function (line) {
        countMW++;
        if (countMW == 1) return;
        var items = line.split('|');
        if (items[2] === undefined) return;


        if (groupCount[items[2]] !== undefined && groupCount[items[2]] == limit) return;

        if (groupCount[items[2]] === undefined) groupCount[items[2]] = 1;
        else groupCount[items[2]]++;


        var each = {
            code: items[2],
            index: groupCount[items[2]],
            gender: [],
            times: [],
            toString: function () {
                var string = this.code + ',' + this.index;
                for (var i = 0; i < this.gender.length; i++) {
                    string += ',' + this.gender[i];
                }
                for (var i = 0; i < this.times.length; i++) {
                    string += ',' + this.times[i];
                }
                return string;
            }

        }

        for (var i = 5; i < 10; i++) {
            each.gender.push(items[i]);
        }

        for (var i = 11; i < 16; i++) {
            each.gender.push(items[i]);
        }

        if (group[items[2]] === undefined) group[items[2]] = [];

        group[items[2]].push(each);

    })

    readerMW.on('end', function () {
        var readerTIME = new LineByLineReader(__dirname + '/04_TIME.TXT');

        readerTIME.on('line', function (line) {
            countTIME++;
            if (countTIME == 1) return;
            var items = line.split('|');
            if (groupCount[items[2]] === undefined) return;
            if (groupCount[items[2]] == 0) return;
            if (items[2] === undefined) return;
            groupCount[items[2]] -= 1;
            var idx = groupCount[items[2]];
            for (var i = 4; i < 28; i++) {
                group[items[2]][idx].times.push(items[i]);
            }

        })

        readerTIME.on('end', function () {

            var str = '';
            var keys = Object.keys(group);
            for (var i = 0; i < keys.length; i++) {
                for (var j = 0; j < group[keys[i]].length; j++) {
                    str += group[keys[i]][j].toString();
                    str += '\n';
                }
            }

            for (var i = 0; i < group.length; i++) {
                console.log(group[i].toString())
            }
            fs.writeFile(__dirname + '/converted.json', JSON.stringify(group, null, 4), function (err) {
                if (err) throw err;
                console.log('JSON write completed');
            });

            fs.writeFile(__dirname + '/converted.csv', str, function (err) {
                if (err) throw err;
                console.log('CSV write completed');
            });

        })
    })


}
