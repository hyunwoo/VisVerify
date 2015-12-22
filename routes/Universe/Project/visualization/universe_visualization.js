/**
 * Created by hyunwoo on 12/22/15.
 */
var express = require('express');
var router = express.Router();

var DBFunc = require('../../../../functions/DBFunction');
var db = DBFunc.db;
var Func = require('../../../../functions/defaultFunctions')
var multi;
module.exports = router;

router.get('/', function (req, res) {
    console.log(req.query);
    res.render('universe/project/visualization/universe_visualization', req.session);
})