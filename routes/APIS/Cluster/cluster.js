/**
 * Created by hyunwoo on 11/10/15.
 */
var express = require('express');
var router = express.Router();
var clustering = require('density-clustering');
var csvtojson = require('../../../functions/CsvToJson')

module.exports = router;

var dataset = [
    [1,1],[0,1],[1,0],
    [10,10],[10,13],[13,13],
    [54,54],[55,55],[89,89],[57,55]
];

var datasetOptics = [
    [0,0],[6,0],[-1,0],[0,1],[0,-1],
    [45,45],[45.1,45.2],[45.1,45.3],[45.8,45.5],[45.2,45.3],
    [50,50],[56,50],[50,52],[50,55],[50,51]
];

function DBScan(dataset, neighborRadius, pointsCount){
    var dbscan = new clustering.DBSCAN();
    // parameters: 5 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
    var clusters = dbscan.run(dataset, 5, 2);
    console.log(clusters);
    console.log(dbscan.noise);
    return {
        cluster : clusters,
        plot : dbscan.noise,
    }
}

function Optics(dataset, neighborRadius, pointsCount){
    var optics = new clustering.OPTICS();
    // parameters: 6 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
    var clusters = optics.run(dataset, 6, 2);
    var plot = optics.getReachabilityPlot();
    console.log(clusters);
    console.log(plot);
    return {
        cluster : clusters,
        plot : plot,
    }
}
function Kmeans(dataset, group_count){
    var kmeans = new clustering.KMEANS();
    // parameters: 3 - number of clusters
    var clusters = kmeans.run(dataset, group_count);
    return {
        cluster : clusters,
    }
}

module.exports = router;

router.get('/', function (req, res) {
    res.render('apis/cluster/cluster');
});

router.get('/kmeans', function(req,res){
    console.log("IN KEANS")
    var output = Kmeans(dataset,5);
    //console.log(output);
    res.send(output);
})


router.get('/DBScan', function(req,res){
    console.log("IN DBScan")
    var output = DBScan(dataset,5);
    //console.log(output);
    res.send(output);
})

router.get('/Optics', function(req,res){
    console.log("IN Optics")
    var output = Optics(datasetOptics,5);
    //console.log(output);
    res.send(output);
})

