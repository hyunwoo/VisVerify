/**
 * Created by Luan on 2015. 12. 22..
 */
var express = require('express');
var router = express.Router();

var DBFunc = require('../../../functions/DBFunction');
var db = DBFunc.db;
var Func = require('../../../functions/defaultFunctions')
var multi;
module.exports = router;

router.get('/', function (req, res) {
    if (!DBFunc.UserAuthCheck(req)) {
        console.log('session not exist')
        res.redirect('/universe/login');
        return;
    }

    var email = req.session.user.email;
    //var email = 'h.hyunwoo@gmail.com';

    var multi = db.multi();
    multi.select(0);
    multi.hgetall(DBFunc.getUserID(email));
    multi.select(1);
    multi.smembers(DBFunc.getUserDataList(email));
    multi.exec(function (err, rep) {
        console.log(err, rep);
        if (err != null) {
            // goto ErrorPage
        } else {
            var user = rep[1];
            var keys = rep[3];

            multi = db.multi();
            multi.select(1);
            for (var i = 0; i < keys.length; i++) {
                multi.hgetall(keys[i]);
            }
            multi.exec(function (err, rep) {
                console.log(err, rep);
                if (err != null) {

                } else {
                    var deliver = {
                        user: req.session.user,
                        userinfo : user,
                        data: rep,
                    }
                    res.render('universe/project/userprojectlist', deliver);
                }
            })
        }
    })

})
