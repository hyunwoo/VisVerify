/**
 * Created by Luan on 15. 11. 9..
 */

/**
 * Created by Luan on 15. 10. 4..
 */
var express = require('express');
var router = express.Router();
var lda = require('../../../functions/LDA');
module.exports = router;


router.get('/', function (req, res) {
    console.log("in new projects");
    res.render('projects/topicnetwork/topicnetwork_main');

});


router.get('/topicnetwork_lda', function (req, res) {
    res.render('projects/topicnetwork/topicnetwork_lda')
})

