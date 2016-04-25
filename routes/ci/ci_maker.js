/**
 * Created by hyunwoo on 12/15/15.
 */


var express = require('express');
var router = express.Router();


//
var db = require('../../functions/DBFunction').db;


module.exports = router;

router.get('/procedural_modeling_logo_drawing', function(req,res){
    res.render('ci/freearc');
})
router.get('/burst', function (req, res) {
    console.log("in");
    res.render('ci/burst');
})

router.get('/freeArcs', function (req, res) {
    console.log("in");
    res.redirect('/ci/procedural_modeling_logo_drawing')
    //res.render('ci/freearc');
})

router.post('/freeArcs/save', function (req, res) {
    console.log('in post')
    var multi = db.multi();
    multi.select(6);

    var name = req.body.name;
    var data = req.body.data;

    console.log("save freearcs data")
    multi.set(name, data);
    multi.exec(function (err, rep) {
        console.log(err, rep);
        res.send(rep[1]);
    })
})

router.get('/freeArcs/list', function(req,res){
    var multi = db.multi();
    multi.select(6);
    multi.keys('*');
    multi.exec(function(err,rep){
        console.log(err,rep);
        if(!err) res.send(rep[1])
        else res.send(false);
    })
})

router.get('/freeArcs/load', function (req, res) {

    console.log("in")

    try {
        var name = req.query.name;
        var multi = db.multi();
        multi.select(6);
        multi.get(name);
        multi.exec(function (err, rep) {
            console.log(rep[1])
            if(!err)
                res.send(rep[1])
            else res.send(false)
        })
    } catch(e){
        console.log(e);
    }
})