var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var route_kmeans = require('./routes/kmeans');
var route_visual_network = require('./routes/visualization/visual_network');
var users = require('./routes/users');


var app = express();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

/*
var natural = require('natural');
var wordnet = new natural.WordNet();

wordnet.lookup('node', function (results) {
    results.forEach(function (result) {

         console.log('------------------------------------');
         console.log(result.synsetOffset);
         console.log(result.pos);
         console.log(result.lemma);
         console.log(result.synonyms);
         console.log(result.pos);
         console.log(result.gloss);
    });
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'public')));
app.use(busboy());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/', routes);
app.use('/kmeans', route_kmeans);
app.use('/users', users);
app.use('/visualization/network', route_visual_network);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3001);

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




