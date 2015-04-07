/**
 * Created by Luan on 15. 4. 7..
 */
var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation


var kmeans = require('node-kmeans');
/* GET home page. */

module.exports = router;


var data = [
    {'company': 'Microsoft' , 'size': 91259, 'revenue': 60420},
    {'company': 'IBM' , 'size': 400000, 'revenue': 98787},
    {'company': 'Skype' , 'size': 700, 'revenue': 716},
    {'company': 'SAP' , 'size': 48000, 'revenue': 11567},
    {'company': 'Yahoo!' , 'size': 14000 , 'revenue': 6426 },
    {'company': 'eBay' , 'size': 15000, 'revenue': 8700},
];

// Create the data 2D-array (vectors) describing the data
var vectors = new Array();
for (var i = 0 ; i < data.length ; i++)
    vectors[i] = [ data[i]['size'] , data[i]['revenue']];

kmeans.clusterize(vectors, {k: 2}, function(err,res) {
    if (err) console.error(err);
    else console.log('%o',JSON.stringify(res, null, '\t'));
});


router.get('/', function(req, res) {


    res.render('kmeans');
});


router.post('/', function(req, res) {
    console.log(req.body)


    res.render('kmeans');
});





