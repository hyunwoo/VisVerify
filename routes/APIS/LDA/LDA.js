/**
 * Created by Luan on 15. 11. 10..
 */

var express = require('express');
var router = express.Router();
var request = require('request').defaults({maxRedirects: 25});
var cheerio = require("cheerio");
var Iconv = require('iconv').Iconv;
var iconvlite = require('iconv-lite');
iconvlite.extendNodeEncodings();
var iconv = new Iconv('euc-kr', 'UTF-8//TRANSLIT//IGNORE');
var jsdom = require('jsdom');
var request = require('request');
var url = require('url');


extractor = require('unfluff');

module.exports = router;
var lda = require('../../../functions/LDA');

router.get('/', function (req, res) {
    res.render('apis/lda/lda');

});



function ProcessLDA(text, topic_count, topic_element_count){
    var output = lda.topics(text, topic_count, topic_element_count);

    var result = {
        success : true,
        topics : []
    }

    for(var i = 0 ; i < output.length ; i ++)
        result.topics.push(output[i]);


    return result;
    //
    var templines  = text.split('.');

    var sentences = [];
    for(var i = 0 ; i < templines.length ; i ++){
        var samples = templines[i].split('\n');
        sentences.push(samples);
    }
    //console.log(sentences);

    for(var i = 0 ; i < sentences.length ; i ++){
        for(var j = 0 ; j < output.length; j ++){
            var setSentence = true;
            var unCheckCount = 0;
            for(var k = 0 ; k < output[j].length; k ++){
                if(sentences[i].indexOf(output[j].term) == -1){
                    unCheckCount ++;
                    if(unCheckCount >4) {
                        setSentence = false;
                        break;
                    }
                }

            }
            if(setSentence)
                console.log(j + " : " + sentences[i]);
        }
    }

}

router.post('/topicmodeling' , function(req,res){
    try {

        var text = req.body.text;
        var topic_count = req.body.topic_count;
        var topic_element_count = req.body.topic_element_count;

        var result = ProcessLDA(text, topic_count, topic_element_count);
        res.send(result);
    } catch (e){
        console.log(e);
        res.send({
            success:false,
            err : JSON.stringify(e)
        })
    }
})
