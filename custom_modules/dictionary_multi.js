/**
 * Created by hyunwoo on 2015-07-06.
 */


var csvParser = require('../functions/CsvToJson');
var defaultFunc = require('../functions/defaultFunctions');
var http = require('http');
var db = require('redis').createClient(13000, '202.30.24.169');

// dictionary = 1;


// dic:words <- word list key
db.select(6);


db.smembers('dic:words', function(err,rep){
    console.log(rep);
    var words = rep;

    db.hgetall(words[0], function(err,rep){
        var data = JSON.parse(rep['More Data']);
        console.log(data);
    })


})
/*

function getMoreWordsInfo(words, idx){

    if(idx == words.length) {
        return;
    }


    var word = words[idx];

    http.get("http://thesaurus.altervista.org/thesaurus/v1?key=dQN2dzoGuXsd7S8S7rjS&word=dirty&language=en_US&output=json"
        , function (res) {
            var data = '';
            res.on('data',function(chunk){
                data += chunk;
            })
            res.on('end',function(){
                db.hset(word, 'More Data', data.toString(), function(err,rep){
                    if(err == null) {
                        console.log('SUCCESS : [ IDX : ' + idx + ' , WORD : ' + words[idx] + ']');
                        getMoreWordsInfo(words,++idx);
                    } else {
                        console.log('FAILED  : [ IDX : ' + idx + ' , WORD : ' + words[idx] + ']');
                    }
                })
            })
        })




}

return;
var http = require('http');
*/

