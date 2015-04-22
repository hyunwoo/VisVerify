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




