/**
 * Created by hyunwoo on 2015-07-19.
 */


var db = require('redis').createClient(13000, '202.30.24.169');
var stemmer = require('stemmer');
var sentiment = require('../functions/SentimenAnalsys');

function job(keys, index, func) {
    var multi = db.multi();
    var key = keys[index];

    if (keys.length == index) {
        func();
        return;
    }
    index++;

    multi.select(1);
    multi.hgetall(key);
    multi.exec(function (err, rep) {

        var input = rep[1].text;
        var out = stemmer(input);
        var words = out.split(' ');

        var multi = db.multi();
        multi.select(3);
        for (var i = 0; i < words.length; i++) {
            for (var j = 1; j < 11; j++) {
                multi.hgetall('word:' + j + ':' + words[i]);
            }
        }
        multi.exec(function (err, rep) {
            //console.log(rep);
            if (err != null) {
                sendFailedResult(res);
                return;
            }
            var result = ['OK'];

            result.push({
                input: input,
                out: out,
            })
            for (var i = 1; i < rep.length; i += 10) {
                var getResult = false;
                for (var j = i; j < i + 10; j++) {
                    if (rep[j] != null) {
                        getResult = true;
                        result.push(rep[j]);

                        break;
                    }
                }
            }


            var multi = db.multi();
            multi.select(1);

            var senti = sentiment.sentiment(result[0].out);


            var AM = 0, ASD = 0, VM = 0, VSD = 0, Word = '';
            var count = 0;
            for (var i = 2; i < result.length; i++) {
                AM += result[i].A_M * 1;
                ASD += result[i].A_SD * 1;
                VM += result[i].V_M * 1;
                VSD += result[i].V_SD * 1;
                Word += result[i].Word + " ";
                count++;
            }
            if (count != 0) {
                AM /= count;
                ASD /= count;
                VM /= count;
                VSD /= count;
                AM = Math.floor(AM * 100) / 100;
                ASD = Math.floor(ASD * 100) / 100;
                VM = Math.floor(VM * 100) / 100;
                VSD = Math.floor(VSD * 100) / 100;
                var obj = {
                    score: senti.score,
                    comp: senti.comparative,
                    AM: AM,
                    ASD: ASD,
                    VM: VM,
                    VSD: VSD,
                    Word: Word,
                }
                multi.hmset(key, obj);
                multi.exec(function (err, rep) {
                    var progress = Math.floor(index / keys.length * 10000) / 100;
                    if (err == null)
                        console.log("[ " + rep[1] + " ]\t\t" + index + " : " + progress + "% ");
                    else
                        console.log("[ Failed ]\t\t" + index + " : " + progress + "%");

                    job(keys, index, func);
                })

            } else {
                var progress = Math.floor(index / keys.length * 10000) / 100;

                console.log("[ Pass ]\t\t" + index + " : " + progress + "%");
                job(keys, index,func);
            }
        })


    })
}

function loadHeader(headers, index){
    if(headers.length == index) {
        console.log("ALL OVER");
        return;
    }
    multi = db.multi();
    multi.select(2);
    multi.zrange(headers[index], 0, -1);
    multi.exec(function (err, rep) {
        console.log(" complete : " + headers[index]);
        job(rep[1], 0, function(){
            // do next
            loadHeader(headers, ++index);
        })
    })


}
var multi = db.multi();
multi.select(2);
multi.keys('location:*');
multi.exec(function (err, rep) {
    var multi = db.multi();
    var headers = rep[1];
    var idx = 0;


    loadHeader(headers,idx);

});





