var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var route_verify = require('./routes/verify');
var route_visualization = require('./routes/visualization');
var crossdomain = require('crossdomain');
var session = require('express-session');

// Project
var route_projects = require('./routes/projects');
var route_sementicnode = require('./routes/Projects/SementicNode/sementicnode');
var route_NWS = require('./routes/Projects/NWS/NWSAccidents');
var route_Pedigree = require('./routes/Projects/Pedigree/Pedigree')
var route_Cosmovis = require('./routes/Projects/Cosmovis/cosmovis')
var route_Logonetwork = require('./routes/Projects/Logonetwork/logonetwork')

// System
var route_Topicmodeling = require('./routes/Systems/TopicNetwork/topicnetwork')

// API
var route_api_crawler = require('./routes/APIS/SiteScraper/SiteScraper')
var route_api_lda = require('./routes/APIS/LDA/LDA')
var route_api_cluster = require('./routes/APIS/Cluster/cluster')
var route_CRC = require('./routes/Projects/CRC/crc')
var route_ci_burst = require('./routes/ci/ci_maker');
var crypto = require('crypto');

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
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(busboy());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser());
app.use(cors());

app.use(session({
    secret: 'UNIVERSE',
    resave: false,
    saveUninitialized: true
}));

app.use('/', routes);
app.use('/users', users);
app.use('/verify', route_verify);
app.use('/visualization', route_visualization);
app.use('/projects', route_projects);
app.use('/projects/NWS', route_NWS);
app.use('/projects/Pedigree', route_Pedigree);
app.use('/projects/cosmovis', route_Cosmovis);
app.use('/projects/logonetwork', route_Logonetwork);
app.use('/projects/crc', route_CRC);


app.use('/systems/topicmodeling', route_Topicmodeling);
app.use('/apis', route_api);
app.use('/apis/sitescraper', route_api_crawler);
app.use('/apis/lda', route_api_lda);
app.use('/apis/cluster', route_api_cluster);

app.use('/ci/', route_ci_burst);


// Universe System
var route_universe = require('./routes/Universe/universe_main')
var route_universe_project = require('./routes/Universe/Project/universe_userprojectlist')
var route_universe_visualization = require('./routes/Universe/Project/visualization/universe_visualization')
var route_universe_dashboard = require('./routes/Universe/Project/dashboard/universe_dashboard')
var route_universe_Section9 = require('./routes/Universe/Project/sample/Section9/Section9')
var route_universe_Pedigree = require('./routes/Universe/Project/sample/Pedigree/Pedigree')
var route_universe_Credos = require('./routes/Universe/Project/sample/Credos/CredosIndex')
var route_universe_CRC_Go = require('./routes/Universe/Project/sample/CRC/GoNetwork')
var route_universe_Ajou2017 = require('./routes/Universe/Project/sample/Ajou2017/Ajou2017')

app.use('/universe', route_universe);
app.use('/universe/project', route_universe_project);
app.use('/universe/visualization', route_universe_visualization);
app.use('/universe/dashboard', route_universe_dashboard);
app.use('/universe/samples/section9', route_universe_Section9);
app.use('/universe/samples/pedigree', route_universe_Pedigree);
app.use('/universe/samples/credos', route_universe_Credos);
app.use('/universe/samples/netppl/gonetwork', route_universe_CRC_Go);
app.use('/universe/samples/ajou2017', route_universe_Ajou2017);


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
