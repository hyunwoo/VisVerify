var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/login', function (req, res) {
    req.session.regenerate(function () {
        req.session.user = {
            id: 'chansigi'
        }
        res.send('good');
    });


});

router.get('/test', function (req, res) {
    console.log(req.session);
    res.send('good');
});


module.exports = router;