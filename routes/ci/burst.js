/**
 * Created by hyunwoo on 12/15/15.
 */


var express = require('express');
var router = express.Router();
module.exports = router;


router.get('/', function (req, res) {
    console.log("in");
    res.render('ci/burst');
})