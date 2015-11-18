/**
 * Created by Luan on 2015. 11. 18..
 */
var express = require('express');
var router = express.Router();
module.exports = router;


router.get('/', function(req,res){
    console.log("in");
    res.render('projects/CRC/crc_main');
})

router.get('/visualization/prototype01', function(req,res){
    res.render('projects/CRC/crc_proto01');
})

router.get('/visualization/kor', function(req,res){
    res.render('projects/Cosmovis/cosmovis_kor');
})