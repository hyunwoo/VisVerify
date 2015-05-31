/**
 * Created by hyunwoo on 2015-04-22.
 */
var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');

module.exports = router;


router.get('/', function(req, res) {
    res.render('visualization');
});

router.get('/network', function(req, res) {
    res.render('visualization_jade/visual_network');
});

router.get('/streamgraph', function(req, res) {
    var default_data = fs.readFileSync('./exampleData/nvd3/stackedAreaData.json');
    var deliver = {};

    deliver.default_data = JSON.stringify(JSON.parse(default_data), null, 4)
    res.render('visualization_jade/visual_streamgraph', deliver);
});

router.get('/forcedirectedgraph', function(req, res) {
    var default_data = fs.readFileSync('./exampleData/d3js/miserables.json');
    var deliver = {};
    deliver.default_data = JSON.stringify(JSON.parse(default_data), null, 4)
    console.log(deliver);
    res.render('visualization_jade/visual_forcedirectedgraph', deliver);
});


router.get('/line_graph', function(req, res) {
    var deliver = {};
    //deliver.default_data = JSON.stringify(JSON.parse(default_data), null, 4)
    //console.log(deliver);
    res.render('visualization_jade/visual_linegraph', deliver);
});

router.get('/stacked_line_graph', function(req, res) {
    var deliver = {};
    //deliver.default_data = JSON.stringify(JSON.parse(default_data), null, 4)
    //console.log(deliver);
    res.render('visualization_jade/visual_stackedgraph', deliver);
});

router.get('/focused_line_graph', function(req, res) {
    var deliver = {};
    //deliver.default_data = JSON.stringify(JSON.parse(default_data), null, 4)
    //console.log(deliver);
    res.render('visualization_jade/visual_focus_line_graph', deliver);
});



router.post('/', function(req, res) {
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
        fstream.on('error', function(e){
            console.log(e);
        })
    });
});




