/**
 * Created by hyunwoo on 2015-06-05.
 */
var db = require('redis').createClient(13000, '202.30.24.169');

var sentiment = require('../functions/SentimenAnalsys');
var multi = db.multi();

multi.select(4);
multi.hkeys('Progress');
multi.hkeys('Cities');
var keys = [];
multi.exec(function(err,rep){
    var times = rep[1];
    var cities = rep[2];
    for(var i = 0 ; i < cities.length ; i ++){
        for(var j = 0 ; j < times.length; j ++){
            var key = 'location:'+ cities[i] + ':' + times[j];
            keys.push(key);
        }
    }
    analsys(0);
})


function analsys(idx){
    if(idx >= keys.length){
        console.log("completed");
        return;
    }
    multi = db.multi();
    multi.select(2);
    multi.zrange(keys[idx], 0, -1)
    var value = [];
    for(var i = 0 ; i < 201; i ++){
        value[-100 + i] = 0;
    }
    multi.exec(function(err,rep){
        multi = db.multi();
        multi.select(1);
        for(var i = 0 ; i < rep[1].length ; i ++){
            multi.hgetall(rep[1][i]);
        }
        multi.exec(function(err,rep){

            var aver = 0;
            for(var i = 1; i < rep.length ; i ++){
                value[Math.floor(sentiment.sentiment(rep[i].text).comparative * 100)] += 1;
                aver += Math.floor(sentiment.sentiment(rep[i].text).comparative * 100) ;
            }
            aver /= rep.length;
            multi = db.multi();
            multi.select(5);
            var save_key = keys[idx].replace('location','sentiment');
            for(var i = 0 ; i < 201; i ++){
                multi.hset(save_key, 100 - i , value[100 - i] );
            }
            multi.hset(save_key, 'total', rep.length);
            multi.hset(save_key, 'aver',aver);
            multi.exec(function(err,rep){
                if(err){
                } else {
                    console.log("complete : " + keys[idx]);
                    analsys(idx + 1);
                }

            })


        })
    })




}
