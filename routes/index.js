var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var func = require('../functions/defaultFunctions')
var DBFunc = require('../functions/DBFunction');
var url = require('url');
var db = require('redis').createClient(6500, '202.30.24.169');
var multi;

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
    var type = req.query.type;

    if (email === undefined) {
        DBFunc.resSendFailed(res, "not exist E-Mail")
        return;
    }

    if (!func.isEmail(email)) {
        DBFunc.resSendFailed(res, "USER AUTH ERROR")
        return;
    }

    if (title === undefined) {
        DBFunc.resSendFailed(res, "not exist Title")
        return;
    }

    if (type === undefined) {
        DBFunc.resSendFailed(res, "not exist Type")
        return;

    }


    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        //Path where image will be uploaded
        fstream = fs.createWriteStream(__dirname + '/../trash/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            res.send('asdf');
            SaveFileToDatabase(fstream.path, email, title, filename, type, res);
        });
        fstream.on('error', function (e) {
            console.log(e);
        })
    });
});

var fs = require("fs"); //Load the filesystem module

function SaveFileToDatabase(path, email, title, filename, type) {
    var size = getFileSize(path);


    var userId = DBFunc.getUserID(email);
    var dataList = DBFunc.getUserDataList(email);
    var dataId = DBFunc.getUserData(email, DBFunc.getDataUniqueID());

    console.log(userId, dataList, dataId);
    multi = db.multi();
    multi.select(0);
    multi.hincrby(userId, 'DataCount', 1);
    multi.select(1);


    multi.sadd(dataList, dataId);
    multi.hmset(dataId, {
        key : dataId,
        filename: filename,
        path: path,
        capacity: size,
        type: type,
        title: title,
        auth : email,
    })

    multi.exec(function (err, rep) {
        console.log('create file table', err, rep)
        multi = db.multi();
        if (err != null) {
            multi.select(0);
            multi.sadd(DBFunc.getUserERROR(email), title + ' [' + type + '] failed to refine.  datafile name : ' + filename);
            multi.exec(function (err, rep) {
                console.log(err, rep);
            });
        }
    })


}

function getFileSize(path) {
    var stats = fs.statSync(path);
    var fileSizeInBytes = stats["size"];
    //Convert the file size to megabytes (optional)
    var fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
    return Number((fileSizeInMegabytes).toFixed(2)) + "MB";
}




