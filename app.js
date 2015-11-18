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
app.use('/users', users);
//app.use('/visualization/network', route_visual_network);
//app.use('/visualization/streamgraph', route_visual_stream);
app.use('/verify', route_verify);
app.use('/visualization', route_visualization);
app.use('/projects', route_projects);
//app.use('/projects/sementicnode', route_sementicnode);
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

// here Test

return;
var corr = require('matrix-correlation');

var A = [
    [0,0,0],
    [54,54,54],
];

var B = [
    [0,0,0],
    [108,108,108],
];



var pcorr = require( 'compute-pcorr' );

var x = [ 1, 2, 3, 4, 5 ],
    y = [ 5, 4, 3, 2, 1 ];

var mat = pcorr( x, y );
console.log(mat);

function isNumber(s) {
    s += ''; // 문자열로 변환
    s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
    if (s == '' || isNaN(s)) return false;
    return true;
}


var matrix = [];
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./carddata/buydata.csv');

lr.on('error', function (line) {

});

var count = 0 ;
var rawData = [];
lr.on('line', function (line) {
    var datas = line.split(',');
    if(!isNumber(datas[1])) return;
    var data = [];
    for(var i = 4 ; i < 14 ; i ++){
        data.push(Number(datas[i]));
    }
    matrix.push(data);
    rawData.push(datas);
    count ++;

});

lr.on('end', function (line) {
    var out = pcorr(matrix);
    console.log('total count : ' + count);
    var outData = '';

    var nodes = [];
    var links = [];

    for(var i = 0 ; i < 500 ; i ++){
        nodes.push({
            name : rawData[i][2] + "_" + i,
            group : Math.floor(i / 50),
        })
    }

    for(var i = 0 ; i < out.length ; i ++){
        for(var j = 0 ; j < out[i].length ; j ++){
            outData += ""+ out[i][j];
            var eff = Math.pow(Number(out[i][j]) , 5) * 5;
            if( i != j){
                if( eff > 4.9){
                    links.push({
                        source : i,
                        target : j,
                        value :Math.random(),
                    })
                }
            }
            if(j != out[i].length - 1){
                outData += ',';
            } else {
                outData += '\n';
            }
        }
    }




    console.log(links);


    var NetworkData = {
        nodes : nodes,
        links : links,
    }

    fs.writeFile('./output/NetworkData_1117.json', JSON.stringify(NetworkData, null, 4), function(err) {
        if(err) throw err;
        console.log('File write completed');
    });


    fs.writeFile('./output/correlationcoefficient.csv', outData, function(err) {
        if(err) throw err;
        console.log('File write completed');
    });


});
return;

var iconv = require('iconv-lite');
iconv.extendNodeEncodings();
var Iconv  = require('iconv').Iconv;
var euckr2utf8 = new Iconv('EUC-KR', 'UTF-8');
var utf82euckr = new Iconv('UTF-8', 'EUC-KR');

var fileName = "DMS_SALES_EST_AGE_201304.TXT";
var outFile = fileName + "_OUTPUT.json"
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./carddata/' + fileName);


var result = {};
var kindList = {};
var posList = {};
lr.on('error', function (err) {
    // 'err' contains error object
    console.log(err);
});


var count = 0;
var count_position = {} ;
var count_kind = {} ;
lr.on('line', function (line) {
    // 'line' contains the current line without the trailing newline character.
    var d = line.split('|');
    var pos;
    try {
        pos = "" + d[1].toString().slice(0, 14);
    } catch(e){
        console.log(e);
        return;
    }
    var purchase_data = {
        date : d[0],
        pos : pos,
        kind : d[2],
        kind_name : d[3],
        m20 : d[5],
        m30 : d[6],
        m40 : d[7],
        m50 : d[8],
        m60 : d[9],
        w20 : d[11],
        w30 : d[12],
        w40 : d[13],
        w50 : d[14],
        w60 : d[15],

    }

    count ++;
    if(result[purchase_data.pos] == null){
        result[purchase_data.pos] ={};
        posList[purchase_data.pos] = 1;
    } else {
        posList[purchase_data.pos] ++;
    }

    if(result[purchase_data.pos][purchase_data.kind]  == null){
        result[purchase_data.pos][purchase_data.kind] = purchase_data;
        if(kindList[purchase_data.kind] == null){
            kindList[purchase_data.kind] = 1;
        } else {
            kindList[purchase_data.kind] ++;
        }
    } else {
        result[purchase_data.pos][purchase_data.kind].m20 = Number(purchase_data.m20) + Number(result[purchase_data.pos][purchase_data.kind].m20);
        result[purchase_data.pos][purchase_data.kind].m30 = Number(purchase_data.m30) + Number(result[purchase_data.pos][purchase_data.kind].m20);
        result[purchase_data.pos][purchase_data.kind].m40 = Number(purchase_data.m40) + Number(result[purchase_data.pos][purchase_data.kind].m20);
        result[purchase_data.pos][purchase_data.kind].m50 = Number(purchase_data.m50) + Number(result[purchase_data.pos][purchase_data.kind].m20);
        result[purchase_data.pos][purchase_data.kind].m60 = Number(purchase_data.m60) + Number(result[purchase_data.pos][purchase_data.kind].m20);
        result[purchase_data.pos][purchase_data.kind].w20 = Number(purchase_data.w20) + Number(result[purchase_data.pos][purchase_data.kind].w20);
        result[purchase_data.pos][purchase_data.kind].w30 = Number(purchase_data.w30) + Number(result[purchase_data.pos][purchase_data.kind].w20);
        result[purchase_data.pos][purchase_data.kind].w40 = Number(purchase_data.w40) + Number(result[purchase_data.pos][purchase_data.kind].w20);
        result[purchase_data.pos][purchase_data.kind].w50 = Number(purchase_data.w50) + Number(result[purchase_data.pos][purchase_data.kind].w20);
        result[purchase_data.pos][purchase_data.kind].w60 = Number(purchase_data.w60) + Number(result[purchase_data.pos][purchase_data.kind].w20);
    }


});


lr.on('end', function () {



    var posKeys = Object.keys(posList);
    for(var i = 0 ; i < posKeys.length ; i ++){

        if(posList[posKeys[i]] < 150){
            delete result[posKeys[i]];

        }
    }



    var out = {
        kind : kindList,
        pos : posList,
        result : result,
    }

    //console.log(result);
    var flare = {
        name : '1303',
        children : [],
    }
    var remainPosKeys = Object.keys(result);

    var RemainKindCount = 0;
    for(var i = 0 ;  i < remainPosKeys.length ; i ++){
        var each = {
            name : remainPosKeys[i],
            children : [],
        };

        var KindKeys = Object.keys(result[remainPosKeys[i]]);
        var PosObject = result[remainPosKeys[i]];
        for(var j = 0 ; j < KindKeys.length ; j ++){

            var kindKey = KindKeys[j];
            var eachKind = {
                name : kindKey,
                children : []
            }
            if(PosObject[kindKey].m20 != 0)
                eachKind.children.push({
                    name : 'm20',
                    size : Number(PosObject[kindKey].m20),
                })

            if(PosObject[kindKey].m30 != 0)
            eachKind.children.push({
                name : 'm30',
                size : Number(PosObject[kindKey].m30),
            })

            if(PosObject[kindKey].m40 != 0)
            eachKind.children.push({
                name : 'm40',
                size : Number(PosObject[kindKey].m40),
            })

            if(PosObject[kindKey].m50 != 0)
            eachKind.children.push({
                name : 'm50',
                size : Number(PosObject[kindKey].m50),
            })

            if(PosObject[kindKey].m60 != 0)
            eachKind.children.push({
                name : 'm60',
                size : Number(PosObject[kindKey].m60),
            })

            if(PosObject[kindKey].w20 != 0)
            eachKind.children.push({
                name : 'w20',
                size : Number(PosObject[kindKey].w20),
            })

            if(PosObject[kindKey].w30 != 0)
            eachKind.children.push({
                name : 'w30',
                size : Number(PosObject[kindKey].w30),
            })

            if(PosObject[kindKey].w40 != 0)
            eachKind.children.push({
                name : 'w40',
                size :Number(PosObject[kindKey].w40),
            })

            if(PosObject[kindKey].w50 != 0)
            eachKind.children.push({
                name : 'w50',
                size : Number(PosObject[kindKey].w50),
            })

            if(PosObject[kindKey].w60 != 0)
            eachKind.children.push({
                name : 'w60',
                size : Number(PosObject[kindKey].w60),
            })
            RemainKindCount ++;
            each.children.push(eachKind);
        }
        flare.children.push(each);
    }
    console.log("Remain Positon : " + remainPosKeys.length);
    console.log("Remain KindCount : " + RemainKindCount);

    var output =  JSON.stringify(flare, null , 4);


    //result[]
    /*
    fs.writeFile('./output/' + outFile, output, function(err) {
        if(err) throw err;
        console.log('File write completed');
    });*/

    fs.writeFile('./output/flare.json', output, function(err) {
        if(err) throw err;
        console.log('File write completed');
    });
});

