/**
 * Created by hyunwoo on 9/30/15.
 */

var express = require('express');
var router = express.Router();



router.get('/', function (req, res) {
    console.log("in new projects");
    res.render('projects/SementicNode/sementicnode_controller');
});
