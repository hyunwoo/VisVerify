/**
 * Created by hyunwoo on 12/22/15.
 */
var express = require('express');
var router = express.Router();

var DBFunc = require('../../../../functions/DBFunction');
var db = DBFunc.db;
var Func = require('../../../../functions/defaultFunctions');
var multi;
var CsvToJson = require('../../../../functions/CsvToJson');
var CsvToData = require('../../../../functions/CsvToData');

module.exports = router;


router.get('/', function (req, res) {
    console.log(req.query);
    var data_key = req.query.data;
    res.render('universe/project/dashboard/universe_dashboard', req.session);

})

router.get('/getData', function (req, res) {
    console.log(req.query);
    var data_key = req.query.data;
    multi = db.multi();
    multi.select(1);
    multi.hgetall(data_key);
    multi.exec(function (err, rep) {
        res.render('universe/project/dashboard/universe_dashboard', req.session);
        CsvToData.Read(rep[1].path, function (d) {
            console.log(d);
        })

    })
})