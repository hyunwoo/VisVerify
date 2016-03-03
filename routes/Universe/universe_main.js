/**
 * Created by Luan on 2015. 12. 21..
 */
var express = require('express');
var router = express.Router();

var DBFunc = require('../../functions/DBFunction');
var db = DBFunc.db;
var Func = require('../../functions/defaultFunctions')
var multi;
module.exports = router;


router.get('/', function (req, res) {
    res.render('universe/universe_main', req.session);
})

router.get('/getData', function (req, res) {

})

router.get('/upload', function (req, res) {
    if (!DBFunc.UserAuthCheck(req)) {
        console.log('session not exist')
        res.redirect('/universe/login');
        return;
    }
    res.render('universe/upload/universe_upload', req.session)
})

router.post('/upload', function (req, res) {
    deleteAfterUpload(req.files.myFile.path);
    res.end();
});

router.get('/login', function (req, res) {
    res.render('universe/login/universe_login', req.session)
})

router.post('/auth', function (req, res) {
    console.log("AUTH : ", DBFunc.UserAuthCheck(req));
    var email = req.body.email;
    var pw = req.body.pw;
    var pw_db;

    if (email === undefined || pw === undefined) {
        res.send({
            success: false,
            message: 'undefined value contained.'
        })
        return;
    }

    pw = DBFunc.getHASH(pw);
    multi = db.multi();
    multi.select(0);
    multi.hgetall(DBFunc.getUserID(email));
    multi.exec(function (err, rep) {
        if (err != null) {
            DBFunc.resSendDBError(res);
            return;
        }

        if (rep[1] == null) {
            DBFunc.resSendFailed(res, "User not exist")
            return;
        }

        if (pw === rep[1].pw) {
            req.session.regenerate(function () {
                req.session.user = {
                    email: email,
                    pw: pw,
                };
                req.session.authentication = true;
                DBFunc.resSendSuccess(res, "Sign in Complete")
            });
        } else {
            console.log("LOG IN FAILED")
            DBFunc.resSendFailed(res, "Password is not correct")
        }
    });
})

router.post('/join', function (req, res) {
    if (req.body.email === undefined || req.body.pw === undefined) {
        res.send({
            success: false,
            message: 'undefined value contained.'
        })
        return;
    }

    multi = db.multi();
    multi.select(0);
    multi.exists(DBFunc.getUserID(req.body.email))
    multi.exec(function (err, rep) {
        if (rep[1] === 0) { // noexist make
            multi = db.multi();
            multi.select(0);
            var userData = {
                email: req.body.email,
                pw: DBFunc.getHASH(req.body.pw),
                jointime: Func.getDate(),
                DataCount: 0,

            }
            multi.hmset(DBFunc.getUserID(req.body.email), userData);
            multi.exec(function (err, rep) {
                console.log(err, rep);
                if (err == null) {
                    req.session.regenerate(function () {
                        req.session.user = {
                            email: userData.email,
                            pw: userData.pw,
                        };
                        req.session.authentication = true;
                        res.send({
                            success: true,
                            message: 'Sign Up Completed',
                        })
                    });
                }
                else {
                    res.send({
                        success: false,
                        message: 'DB ERROR',
                    })
                }

            })
        }
        else { // already exist
            res.send({
                success: false,
                message: 'already exist e-mail',
            })
        }


    })

})

router.get('/netppl', function (req, res) {
    console.log("netppl in");
    res.render('universe/project/netppl/netppl_visualization', req.session)
})

var deleteAfterUpload = function (path) {
    setTimeout(function () {
        fs.unlink(path, function (err) {
            if (err) console.log(err);
            console.log('file successfully deleted');
        });
    }, 60 * 1000);
};

