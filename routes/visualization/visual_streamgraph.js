/**
 * Created by hyunwoo on 2015-04-23.
 */
/**
 * Created by hyunwoo on 2015-04-21.
 */
/**
 * Created by Luan on 15. 4. 7..
 */

var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation


module.exports = router;




router.get('/', function(req, res) {
    var default_data = fs.readFileSync('./exampleData/nvd3/stackedAreaData.json');
    var deliver = {};

    deliver.default_data = JSON.stringify(JSON.parse(default_data), null, 4)
    res.render('visualization_jade/visual_streamgraph', deliver);
});


router.post('/', function(req, res) {
    console.log(req.body)


    res.render('visualization_jade/visual_network');
});





