var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var route_kmeans = require('./routes/Verify/kmeans');
var route_verify = require('./routes/verify');
var route_visualization = require('./routes/visualization');
var crossdomain = require('crossdomain');

// Project
var route_projects = require('./routes/projects');
var route_sementicnode = require('./routes/Projects/SementicNode/sementicnode');
var route_NWS = require('./routes/Projects/NWS/NWSAccidents');
var route_Pedigree = require('./routes/Projects/Pedigree/Pedigree')

// API
var route_api = require('./routes/apis');
var users = require('./routes/users');

var app = express();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var cors = require('cors');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(busboy());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser());
app.use(cors());

app.use('/', routes);
app.use('/kmeans', route_kmeans);
app.use('/users', users);
//app.use('/visualization/network', route_visual_network);
//app.use('/visualization/streamgraph', route_visual_stream);
app.use('/verify', route_verify);
app.use('/visualization', route_visualization);
app.use('/projects', route_projects);
app.use('/projects/sementicnode', route_sementicnode);
app.use('/projects/NWS', route_NWS);
app.use('/projects/Pedigree', route_Pedigree);


app.use('/apis', route_api);


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3001);

var crossdomain_xml = crossdomain({domain: '*.segment.io'});


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