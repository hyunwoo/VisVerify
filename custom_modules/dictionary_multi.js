/**
 * Created by hyunwoo on 2015-07-06.
 */


var csvParser = require('../functions/CsvToJson');
var defaultFunc = require('../functions/defaultFunctions');
var http = require('http');
var db = require('redis').createClient(13000, '202.30.24.169');
var inspect = require('util').inspect;
// dictionary = 1;


// dic:words <- word list key


// Database NO 3.
// order        검색 우선순위 인덱스
// order:idx  ex) order:0  검색 우선순위별 단어목록
//


db.select(6);
var http = require('http');
var fs = require('fs');
db.smembers('dic:words', function (err, rep) {
    var words = rep;


})

exportCsv(0);
function exportCsv(idx) {
    if(idx > 10) return;
    var multi = db.multi();
    multi.select(3)
    multi.smembers('order:' + idx)
    multi.exec(function (err, rep) {

        multi = db.multi();
        for (var j = 0; j < rep[1].length; j++) {
            multi.hgetall('word:'+ idx + ':' + rep[1][j]);
        }


        var data = 'word,cat,A_M,A_SD,V_M,V_SD\n';

        multi.exec(function (err, rep) {
            for (var i = 0; i < rep.length; i++) {
                data += rep[i].Word + ',' + rep[i].Cat + ',' +
                    rep[i].A_M + ',' + rep[i].A_SD + ',' +
                    rep[i].V_M + ',' + rep[i].V_SD + ',' + '\n';
            }
            fs.writeFile('./custom_modules/dictionary_csv/dic_' + idx + '.csv', data, function (err) {
                if (err) {
                    console.log(err)
                }
                console.log('File write completed : Dic ' + idx);
                exportCsv(++idx);
            });
        })


    })
}


function addDatabaseSynonyms(words, idx) {
    if (idx == words.length) {
        console.log("FINISH");
        return;
    }
    var multi = db.multi();
    var word = words[idx];
    word = word.replace(' (similar term)', '');
    multi.select(6);
    multi.hgetall(word);
    multi.exec(function (err, rep) {
        var data = JSON.parse(rep[1]['More Data']);

        multi = db.multi();
        multi.select(3)


        var lists = data['response'];
        if (lists != undefined) {
            for (var i = 0; i < lists.length; i++) {
                var each = data['response'][i];
                var synonyms = each.list.synonyms.split('|');
                for (var j = -1; j < synonyms.length; j++) {
                    var key;
                    if (j == -1) key = word;
                    else key = synonyms[j];


                    key = key.replace(' (similar term)', '');
                    key = key.replace(' (related term)', '');
                    key = key.replace(' (antonym)', '');


                    var order = j + 1;
                    var values = {
                        A_M: rep[1]["Arousal Mean"],
                        A_SD: rep[1]["Arousal SD"],
                        V_M: rep[1]["Valence Mean"],
                        V_SD: rep[1]["Valence SD"],
                        Freq: rep[1]["Word Frequency"],
                        Cat: each.list.category.replace('(', '').replace(')', ''),
                        Word: key,
                        order: order,

                    }
                    multi.sadd('order', order);
                    multi.sadd('order:' + order, key);
                    multi.hmset('word:' + order + ':' + key, values);

                }
            }
            multi.exec(function (err, rep) {
                if (err == null) {
                    console.log('SUCCESS : [' + word + ' , IDX : ' + idx + '] , Progress : ' + (idx / words.length * 100) + " %");
                    addDatabaseSynonyms(words, ++idx);
                } else {
                    console.log('FAILED : [' + word + '] ');
                }

            })

        } else {
            console.log('NODATA : [' + word + ' , IDX : ' + idx + '] , Progress : ' + (idx / words.length * 100) + " %");
            addDatabaseSynonyms(words, ++idx);
        }


    })
}

function getMoreWordsInfo(words, idx) {

    if (idx == words.length) {
        return;
    }


    var word = words[idx];

    http.get("http://thesaurus.altervista.org/thesaurus/v1?key=dQN2dzoGuXsd7S8S7rjS&word=" + word + "&language=en_US&output=json"
        , function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            })
            res.on('end', function () {
                db.hset(word, 'More Data', data.toString(), function (err, rep) {
                    if (err == null) {
                        console.log('SUCCESS : [ IDX : ' + idx + ' , WORD : ' + words[idx] + ']');
                        getMoreWordsInfo(words, ++idx);
                    } else {
                        console.log('FAILED  : [ IDX : ' + idx + ' , WORD : ' + words[idx] + ']');
                    }
                })
            })
        })


}


