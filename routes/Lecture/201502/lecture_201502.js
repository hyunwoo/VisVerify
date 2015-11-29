/**
 * Created by hyunwoo on 11/24/15.
 */
var express = require('express');
var router = express.Router();
module.exports = router;

var pcorr = require('compute-pcorr');
var LineByLineReader = require('line-by-line'),
    group_reader = new LineByLineReader(__dirname + '/data.csv'),
    line_reader = new LineByLineReader(__dirname + '/data2.csv');


var fs = require('fs-extra');
group_reader.on('error', function (line) {

});

var count = 0;
var nodes = [];
var edges = [];
var networkData = {
    nodes: {},
    edges: {}
};
var vectors = new Array();
var node_counts = 0;
var line_counts = 0;
var node_names = [];
var lineVectors = new Array();
var group_size_count = new Array();

group_reader.on('line', function (line) {
    var datas = line.split('\t');
    vectors[node_counts] = [];
    for (var i = 1; i < datas.length; i++) {
        vectors[node_counts].push(Number(datas[i]));
    }
    node_names.push(datas[0]);
    node_counts++;

});



line_reader.on('line', function (line) {
    var datas = line.split('\t');
    lineVectors[line_counts] = [];
    group_size_count[line_counts] = 0;
    for (var i = 1; i < datas.length; i++) {
        lineVectors[line_counts].push(Number(datas[i]));
        group_size_count[line_counts] += Number(datas[i]);
    }

    line_counts++;


})

line_reader.on('end', function (line) {
    var mat = pcorr(lineVectors);

    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++) {
            if (i <= j) continue;
            if (mat[i][j] > 0.85) {
                edges.push({
                    from: Number(i),
                    to: Number(j),
                    //value : (mat[i][j] + 1),
                    title: node_names[i] + ' < - > ' + node_names[j] + " : " + Math.floor(mat[i][j] * 100) / 100,
                })
            }
            //console.log(mat[i][j]);
        }
    }
    fs.writeFile(__dirname + '/../../../public/lecture/201502/data/edges.js', 'var edges = ' + JSON.stringify(edges, null, 4) + ';', function (err) {
        if (err) throw err;
        console.log('Edges write completed');
    });

})

group_reader.on('end', function (line) {
    var kmeans = require('node-kmeans');
    kmeans.clusterize(vectors, {k: 9}, function (err, res) {
        //if (err) console.error(err);
        //else console.log('%o',JSON.stringify(res, null, 4));
        for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < res[i].clusterInd.length; j++) {
                nodes.push({
                    "label": node_names[res[i].clusterInd[j]],
                    "id": res[i].clusterInd[j],
                    "group": i + 3,
                    "isConnect": true,
                    "value": group_size_count[res[i].clusterInd[j]],
                })
            }
        }

        fs.writeFile(__dirname + '/../../../public/lecture/201502/data/nodes.js', 'var nodes = ' + JSON.stringify(nodes, null, 4) + ';', function (err) {
            if (err) throw err;
            console.log('Nodes write completed');
        });
    });


})
router.get('/', function (req, res) {
    console.log("in");
    res.render('lecture/201502/visual01');


})

console.log(__dirname);
router.get('/getData', function (req, res) {


})