var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var func = require('../functions/defaultFunctions')
var url = require('url');





/* GET home page. */
module.exports = router;

router.get('/', function (req, res) {
    res.render('index');
});



router.post('/uploadFile?', function (req, res) {
    var fstream;
    console.log('in upload');
    console.log(req.query)
    req.pipe(req.busboy);

    var email = req.query.email;
    var title = req.query.title;


    if(email === undef){
        res.send({
            success : false,
            message : 'input E-Mail'
        })
        return;
    }
    console.log(func.isEmail(email))


    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        //Path where image will be uploaded
        fstream = fs.createWriteStream(__dirname + '/../trash/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);


            res.send('asdf');
        });
        fstream.on('error', function (e) {
            console.log(e);
        })
    });
});




