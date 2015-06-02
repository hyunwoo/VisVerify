/**
 * Created by Luan on 15. 5. 26..
 */

var func = require('../functions/defaultFunctions')
var APPID = "2ca8a678b40a28ed5f49f8688eae52bb";
var cities = [
    {
        Name: "New York",
        ID: 5128581
    }
    ,
    {
        Name: "Nigeria",
        ID: 2352778
    }
    ,
    {
        Name: "LosAngeles",
        ID: 5368361
    }
    ,
    {
        Name: "Mumai",
        ID: 1275339
    }
    ,
    {
        Name: "Singapore",
        ID: 1880252
    }
    ,
    {
        Name: "Melbourne",
        ID: 2158177
    }
    ,
    {
        Name: "Philippines",
        ID: 1688216
    }
    ,
    {
        Name: "New Delhi",
        ID: 1261481
    }
    ,
    {
        Name: "London",
        ID: 2643743
    }
    ,
    {
        Name: "Toronto",
        ID: 6167865
    }
    ,

]


var http = require('http');
var redis = require('redis');
var db = redis.createClient(13000, "202.30.24.169");


var multi = db.multi();
multi.select(4);
for (var i = 0; i < cities.length; i++) {
    multi.hset("Cities", cities[i].Name, cities[i].ID);
}

multi.exec(function (err, rep) {
})

recursiveGetWeather(0);

var ResultPerTime = {};


setInterval(function () {
    recursiveGetWeather(0);

}, 10800000);


function recursiveGetWeather(idx) {
    var per = Math.floor(func.getDateNoDot() / 30000) * 30000;
    if (idx >= cities.length) {
        logging('End Crawler Weather Set');
        var message = require('util').inspect(ResultPerTime);
        multi = db.multi();
        multi.select(4);
        multi.hmset("Progress", per, require('util').inspect(ResultPerTime));
        multi.exec(function (err, rep) {

        });
        return;
    }
    try {
        http.get("http://api.openweathermap.org/data/2.5/weather?id=" + cities[idx].ID + "&APPID=" + APPID, function (res) {
            var data = '';
            res.on("data", function (d) {
                data += d
            });
            res.on("end", function () {
                var input = JSON.parse(data);

                var result = {
                    lon: input.coord.lon,
                    lat: input.coord.lat,
                    weatherId: input.weather[0].id,
                    weather: input.weather[0].main,
                    desc: input.weather[0].description,
                    temp: Math.floor((input.main.temp * 1 - 273.15)),
                    humidity: input.main.humidity,
                    pressure: input.main.pressure,
                    wind_speed: undefined,
                    wind_deg: undefined,
                    wind_gust: undefined,
                    rain: undefined,
                    snow: undefined
                }
                if (input.rain != undefined) {
                    result.rain = input.rain["3h"];
                }
                if (input.snow != undefined) {
                    result.snow = input.snow["3h"];
                }
                if (input.wind != undefined) {
                    result.wind_speed = input.wind.speed;
                    result.wind_deg = input.wind.deg;
                    result.wind_gust = input.wind.gust;
                }
                var multi = db.multi();
                multi.select(4);
                multi.hmset('weather:' + cities[idx].Name + ":" + per, result);
                multi.exec(function (err, rep) {
                    if (err == null) {
                        ResultPerTime[cities[idx].Name] = "SUCCESS";
                    } else {
                        ResultPerTime[cities[idx].Name] = "DB_ERROR";
                    }
                    recursiveGetWeather(idx + 1);

                })
            })
        })
    } catch (e) {
        logging('ERROR : ' + e);
        setTimeout(function () {
            recursiveGetWeather(0);
        }, 1800000);
    }
}


function logging(s) {
    var per = Math.floor(func.getDateNoDot() / 30000) * 30000;
    console.log("[ " + per + " ] : " + s);
}