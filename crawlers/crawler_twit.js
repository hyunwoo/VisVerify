var util = require('util'),
    twitter = require('twit');

var twit = new twitter({
    consumer_key: 'Grds5Yk7NFaux1jKj2d4pA',
    consumer_secret: 'hXkhMp1ajxet3AYLZxH7OKSGIWoLz56j1c5LaySWE',
    access_token: '179702971-4lUd6Wtp8V2spIOox4lvuB7HfEcBiFmbds3Zj5Ym',
    access_token_secret: 'x4ctypTJ9i4PbtJEIuwSEYSAnojFFruonSC7eXTo'
});


var func = require('../functions/defaultFunctions');
var twitter_steram = require('twitter');
var twit_stream = new twitter_steram({
    consumer_key: 'Grds5Yk7NFaux1jKj2d4pA',
    consumer_secret: 'hXkhMp1ajxet3AYLZxH7OKSGIWoLz56j1c5LaySWE',
    access_token_key: '179702971-4lUd6Wtp8V2spIOox4lvuB7HfEcBiFmbds3Zj5Ym',
    access_token_secret: 'x4ctypTJ9i4PbtJEIuwSEYSAnojFFruonSC7eXTo'
});

var redis = require('redis');
// twitter db index is 6800

var db = redis.createClient(13000, '202.30.24.169');

var SEARCH = 0;
var STREAMING = 1;



// send the message and get a callback with an error or details of the message that was sent

var get = true;
var id = 500000000000000000;
var query = '주식';
var useDB = true;

var type = STREAMING;
db.select(0);


function twitSearch(query, maxid) {
    console.log("search : " + maxid);
    twit.get('search/tweets', {q: query, max_id: maxid, count: 100}, function (err, data) {

        if (err == null) {
            console.log("receive.");

            var list = data.statuses;
            var min_id = maxid;

            var multi;
            if (useDB) multi = db.multi();
            //console.log(data);


            for (var i = 0; i < list.length; i++) {
                var id = list[i].id;
                if (id < min_id) min_id = id;
                //console.log(list[i].id);

                if (useDB) {
                    var isContainStock = false;
                    var textBody = list[i].text;
                    try {
                        if (textBody.toString().indexOf("주가") != -1 ||
                            textBody.toString().indexOf("주가") != -1) {
                            isContainStock = true;
                        }
                    } catch (e) {

                    }
                    /*
                     multi.hmset(list[i].created_at + "_" +id,
                     "created_at", list[i].created_at,
                     "id",list[i].id,
                     "text",list[i].text,
                     "user",list[i].user.id,
                     "user_name",list[i].user.name,
                     "user_screen_name",list[i].user.screen_name,
                     "user_location",list[i].user.location,
                     "follower_cnt", list[i].user.followers_count,
                     "friends_cnt", list[i].user.friends_count,
                     "isStock", isContainStock
                     );*/
                }
            }


            if (useDB) {
                db.set('min_id', min_id);
                multi.exec(function (err, rep) {
                    if (err == null) {
                        console.log("success save.");
                    } else {
                        console.log("ERROR - noti db");
                        db.set('err_' + min_id, err);

                    }
                })
            }

            // do next
            twitSearch(query, min_id);


        } else console.log(err);
    });

}

function TwitStreamGet(data) {

}

var useLog = false;

var temp_val = 0;

setInterval(function () {

    if (stream_count == temp_val) {
        if (stream_count == 0)
            console.log("Stream Restart");
        else
            console.log("twit_stream : release mode ");
        console.log("Time : " + func.getDate());

        twit_stream = null;
        twit_stream = new twitter_steram({
            consumer_key: 'Grds5Yk7NFaux1jKj2d4pA',
            consumer_secret: 'hXkhMp1ajxet3AYLZxH7OKSGIWoLz56j1c5LaySWE',
            access_token_key: '179702971-4lUd6Wtp8V2spIOox4lvuB7HfEcBiFmbds3Zj5Ym',
            access_token_secret: 'x4ctypTJ9i4PbtJEIuwSEYSAnojFFruonSC7eXTo'
        });
        StartStream();
    }

    console.log(stream_count + " , " + temp_val)
    temp_val = stream_count;
}, 10000)

//StartStream();

var count = 0;

function StartStream() {
    console.log("in STREAM");
    twit_stream.stream('statuses/sample', {language: 'en'},
        function (stream) {
            stream.on('data', function (data) {
                try {
                    var multi = db.multi();
                    var user = data.user;
                    multi.select(0);
                    var location = data.user.location.toString();

                    var isSaved = false;
                    if (location.indexOf('Tokyo') > -1) {
                        isSaved = true;
                        location = 'Tokyo';
                    } else if (location.indexOf('London') > -1) {
                        isSaved = true;
                        location = 'London';
                    } else if (location.indexOf('Seoul') > -1) {
                        isSaved = true;
                        location = 'Seoul';
                    } else if (location.indexOf('New York') > -1) {
                        isSaved = true;
                        location = 'New York';
                    } else if (location.indexOf('Nigeria') > -1) {
                        isSaved = true;
                        location = 'Nigeria';
                    } else if (location.indexOf('Melbourne') > -1) {
                        isSaved = true;
                        location = 'Melbourne';
                    } else if (location.indexOf('UK') > -1 || location.indexOf('United Kingdom') > -1) {
                        isSaved = true;
                        location = 'UK';
                    } else if (location.indexOf('USA') > -1) {
                        isSaved = true;
                        location = 'USA';
                    } else if (location.indexOf('Philippines') > -1) {
                        isSaved = true;
                        location = 'Philippines';
                    } else if (location.indexOf('Indonesia') > -1) {
                        isSaved = true;
                        location = 'Indonesia';
                    } else if (location.indexOf('India') > -1) {
                        isSaved = true;
                        location = 'India';
                    } else if (location.indexOf('Singapore') > -1) {
                        isSaved = true;
                        location = 'Singapore';
                    } else if (location.indexOf('Australia') > -1) {
                        isSaved = true;
                        location = 'Singapore';
                    } else if (location.indexOf('Los Angeles') > -1) {
                        isSaved = true;
                        location = 'Los Angeles';
                    } else if (location.indexOf('Toronto') > -1) {
                        isSaved = true;
                        location = 'Toronto';
                    } else if (location.indexOf('Mumbai') > -1) {
                        isSaved = true;
                        location = 'Mumbai';
                    } else if (location.indexOf('New Delhi') > -1) {
                        isSaved = true;
                        location = 'New Delhi';
                    } else if (location.indexOf('France') > -1) {
                        isSaved = true;
                        location = 'France';
                    } else {

                        multi.select(2);
                        multi.zincrby('others', 1, location);
                        multi.exec(function (err, rep) {
                        });
                    }
                    var data_key = "twit:" + data.id;
                    count++;

                    var per = Math.floor(func.getDateNoDot() / 30000) * 30000;

                    if (isSaved) {
                        multi = db.multi();
                        multi.select(2);
                        multi.hget('infos:time:' + per, location);
                        multi.exec(function(err,rep){
                            if(useLog) console.log("[ " + per + " ] : " +  location + " : "  + rep);
                            if(rep[1] * 1 < 300){
                                multi.select(1);
                                multi.hmset(data_key,
                                    "twit_id", data.id,
                                    "user_scr_name", data.user.screen_name,
                                    "user_name", data.user.name,
                                    "user_id", data.user.id,
                                    "date", data.created_at,
                                    "location", location,
                                    "text", data.text);
                                multi.select(2);
                                multi.zadd('location:' + location, data.id, data_key);
                                multi.hincrby('infos', 'total_count', 1);
                                multi.hincrby('infos:time:' + per, location, 1);
                                multi.hincrby('infos', location, 1);

                                multi.exec(function (err, rep) {

                                });
                            }

                        })


                    }
                    stream_count++;

                    if (stream_count % 10000 == 0) {
                    }

                } catch (e) {
                    console.log(e);
                }
            });
        });
}
var stream_count = 0;
switch (type) {
    case SEARCH:
        console.log("in SEARCH");
        twitSearch(query, id);
        break;

    case STREAMING:

        break;

    default:
        break;
}



