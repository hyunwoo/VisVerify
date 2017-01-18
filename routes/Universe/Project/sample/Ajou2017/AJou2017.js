/**
 * Created by hyunwoo on 2017-01-18.
 */
var express = require('express');
var router = express.Router();
module.exports = router;


router.get('/entered', function (req, res) {
    res.render('universe/project/samples/ajou2017/ajou2017');
});
