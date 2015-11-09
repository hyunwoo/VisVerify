/**
 * Created by Luan on 15. 11. 7..
 */
/**
 * Created by Luan on 15. 10. 30..
 */

var express = require('express');
var router = express.Router();
module.exports = router;


router.get('/', function(req,res){
    console.log("in");
    res.render('projects/Cosmovis/cosmovis_main');
})

router.get('/visualization/eng', function(req,res){
    res.render('projects/Cosmovis/cosmovis_eng');
})

router.get('/visualization/kor', function(req,res){
    res.render('projects/Cosmovis/cosmovis_kor');
})