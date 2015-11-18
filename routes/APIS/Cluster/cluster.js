/**
 * Created by hyunwoo on 11/10/15.
 */
var express = require('express');
var router = express.Router();
var clustering = require('density-clustering');
var kmeans = require('kmeans');


module.exports = router;

router.get('/', function (req, res) {
    res.render('apis/cluster/cluster');
});

router.post('/KMeans', function (req, res) {
    var meanCount = req.body.meanCount;
    var meanIter = req.body.meanIter;
    var result = CsvToData(req.body.data);
    if (meanCount === undefined || meanCount == "") meanCount = 2;
    if (meanIter === undefined || meanIter == "") meanIter = 1;

    if (meanCount == 0) meanCount = 2;
    if (meanIter == 0) meanIter = 1;

    var km = kmeans.create(result.matrix, meanCount, meanIter)

    var kmeans_result = km.process();
    result.cluster.centers = [];
    result.cluster.nodes = [];
    for (var i = 0; i < kmeans_result.means.length; i++) {
        var node = [];
        result.cluster.centers.push(kmeans_result.means[i]);
        if (km.nodes[i] != null)
            for (var j = 0; j < km.nodes[i].length; j++) {
                if (km.nodes[i][j] != null) {
                    node.push(result.index[km.nodes[i][j]]);
                }
            }
        result.cluster.nodes.push(node);
    }

    result.type = "KMeans";
    result.group_count = kmeans_result.means.length;
    console.log(meanCount + " , " + meanIter);
    console.log(JSON.stringify(result, null, 4));
    delete kmans_result;
    delete km;
    delete result.index;
    delete result.col_count;
    delete result.data_count;


    res.send(result);
})

router.post('/DBScan', function (req, res) {
    var result = CsvToData(req.body.data);
    var dbscan = new clustering.DBSCAN();
    var radius = req.body.radius;
    var points = req.body.points;

    if (radius === undefined || radius == "") radius = 2;
    if (points === undefined || points == "") points = 1;

    if (radius == 0) radius = 2;
    if (points == 0) points = 1;
    var clusters = dbscan.run(result.matrix, radius, points);
    result.cluster.nodes = [];
    result.cluster.noise = [];
    for (var i = 0; i < clusters.length; i++) {
        var group = [];
        for (var j = 0; j < clusters[i].length; j++) {
            group.push(result.index[clusters[i][j]]);
        }
        result.cluster.nodes.push(group);
    }
    for (var i = 0; i < dbscan.noise.length; i++) {
        result.cluster.noise.push(result.index[dbscan.noise[i]]);
    }

    result.type = "DBScan";
    delete result.index;
    res.send(result);
})

router.post('/Optics', function (req, res) {
    var result = CsvToData(req.body.data);
    var optics = new clustering.OPTICS();
    var radius = req.body.radius;
    var points = req.body.points;

    if (radius === undefined || radius == "") radius = 2;
    if (points === undefined || points == "") points = 1;

    if (radius == 0) radius = 2;
    if (points == 0) points = 1;

    var clusters = optics.run(result.matrix, radius, points);
    var plot = optics.getReachabilityPlot();
    result.cluster.nodes = [];
    for (var i = 0; i < clusters.length; i++) {
        var group = [];
        for (var j = 0; j < clusters[i].length; j++) {
            group.push(result.index[clusters[i][j]]);
        }
        result.cluster.nodes.push(group);
    }

    result.type = "Optics";
    delete result.index;
    res.send(result);
})


var data = "Name, val1, val2, val3\nOpt1, -21 , 2,5\nOpt2, 3 , 5,9\nOpt3, 5 , 5,12\nOpt4, 6 , 4,3";

//CsvToData(data);
function CsvToData(data) {
    var datas = data.split('\n');
    var result = {
        col_count: datas[0].split(',').length - 1,
        data_count: datas.length - 1,
        index: {},
        cluster: {},
        matrix: [],
        data: {},
    }
    var keys = datas[0].split(',');
    for (var i = 1; i < datas.length; i++) {
        var values = datas[i].split(',');
        result.index[i - 1] = values[0];
        var each = [];
        for (var j = 1; j < result.col_count + 1; j++) {
            if (values[j] === undefined) each.push(0);
            else each.push(Number(values[j]));
        }
        result.data[values[0]] = {};
        for (var j = 1; j < result.col_count + 1; j++) {
            result.data[values[0]][keys[j]] = Number(values[j]);
        }
        result.matrix.push(each);
    }


    return result;
}


function DBScan(dataset, neighborRadius, pointsCount) {
    var dbscan = new clustering.DBSCAN();
    var clusters = dbscan.run(dataset, 5, 2);
    console.log(clusters);
    console.log(dbscan.noise);
    return {
        cluster: clusters,
        plot: dbscan.noise,
    }
}

function Optics(dataset, neighborRadius, pointsCount) {
    var optics = new clustering.OPTICS();
    // parameters: 6 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
    var clusters = optics.run(dataset, 6, 2);
    var plot = optics.getReachabilityPlot();
    console.log(clusters);
    console.log(plot);
    return {
        cluster: clusters,
        plot: plot,
    }
}
function Kmeans(dataset, group_count) {
    var kmeans = new clustering.KMEANS();
    // parameters: 3 - number of clusters
    var clusters = kmeans.run(dataset, group_count);
    return {
        cluster: clusters,
    }
}
