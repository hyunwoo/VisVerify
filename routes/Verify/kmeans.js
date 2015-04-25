/**
 * Created by Luan on 15. 4. 7..
 */
var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation


// network Test

var nx = require('../../public/javascripts/javascripts/jsnetworkx');
var G=nx.complete_graph(5)

console.log(nx.clustering(G,0));
console.log(nx.clustering(G));

/*

var csvparse = require('../../functions/CsvToJson');


var test_data = [
    {'company': 'Microsoft' , 'size': 91259, 'revenue': 60420},
    {'company': 'IBM' , 'size': 400000, 'revenue': 98787},
    {'company': 'Skype' , 'size': 700, 'revenue': 716},
    {'company': 'SAP' , 'size': 48000, 'revenue': 11567},
    {'company': 'Yahoo!' , 'size': 14000 , 'revenue': 6426 },
    {'company': 'eBay' , 'size': 15000, 'revenue': 8700},
];


csvparse.Parse('./exampleData/sentimental_tfidf_normalize_csv.csv', function(data){
    var data_vectors = new Array();
    var key_name ;
    for(var i = 0 ; i < data.length ; i ++){
        var keys = Object.keys(data[i]);
        var input = [];
        key_name = keys[0];
        for(var j =  0 ; j < keys.length ; j ++){
            //console.log(keys[j], data[i][keys[j]]);
            if( j == 0) continue;
            input.push(data[i][keys[j]]);
        }
        //console.log(input);
        data_vectors.push(input);
    }
    //console.log(data_vectors);
    kmeans.clusterize(data_vectors, {k: 7}, function(err,res) {
        if (err) console.error(err);
        else {

            for(var i = 0 ; i < res.length ; i ++) {
                //console.log('================');
                //console.log(data[0][key_name]);
                for(var j = 0 ; j < res[i].clusterInd.length ; j ++){
                 //   console.log(data[res[i].clusterInd[j]][key_name]);
                }

            }
        }
    });

})
*/
var kmeans = require('node-kmeans');
/* GET home page. */

module.exports = router;



// Create the data 2D-array (vectors) describing the data




router.get('/', function(req, res) {


    res.render('layout');
});


router.post('/', function(req, res) {
    console.log(req.body)


    res.render('layout');
});





