/**
 * Created by hyunwoo on 2015-04-22.
 */
var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

/* GET home page. */

//a Tokenizer
//a NaiveBayes Classifier
//a Phonetics
//a Noun Inflectors
//    N-Grams
//    TF-IDF

module.exports = router;

router.get('/', function(req, res) {
    res.render('verify');
});

router.post('/', function(req, res) {

});




