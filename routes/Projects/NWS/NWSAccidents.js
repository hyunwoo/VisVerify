/**
 * Created by Luan on 15. 10. 4..
 */
var express = require('express');
var router = express.Router();

module.exports = router;

var redis = require('redis');

// port 16800
var db = require('redis').createClient(16800, '202.30.24.169');

router.get('/', function (req, res) {
    console.log("in new projects");
    res.render('projects/SementicNode/sementicnode_controller');

});

/** PostData To Database */
/*
var fs = require('fs');
var posts;
fs.readFile('./post.tsv', function (err, data) {
    if (err) throw err;
    posts = data.toString().split('\n');
    savePostToDatabase(0);
});
*/


function getPostNumberToAddress(number, func){
    var multi = db.multi();
    multi.select(1);
    multi.smembers(number);
    multi.exec(function(err,rep){
        if(err != null){
            func({
                success : false,
                ERR : "ERROR",
            });
            return;
        }
        if(rep[1] === undefined || rep[1] == null || rep[1].length == 0){
            func({
                success : false,
                ERR : "NO DATA",
            });
            return;
        }
        var multi = db.multi();
        multi.select(1);
        var count = 1;//rep[1].length;
        for(var i = 0 ; i < count ; i ++){
            multi.hgetall(rep[1][i]);
        }

        multi.exec(function(err,rep){
            if(err != null){
                func({
                    success : false,
                    ERR : "ERROR",
                });
                return;
            }
            var result = [];
            for(var i = 1 ; i < rep.length ; i ++){
                result.push(rep[i])
            }
            func({
                success:true,
                DATA : result
            })
        })

    })
}



router.get('/PostData', function(req,res){
    var number = req.query.num;
    var main = req.query.main;

    if(main === undefined) main = true;
    if(number === undefined) {
        res.send({
            success : false,
            ERR : "Parameter Error",
        });
        return;
    }

    getPostNumberToAddress(number, function(data){
        res.send(data);
    })


})

//makeHighwayData(0,10000);
var countProgress = 0;
var HighwaydataCount = 0;

var _idx = 0;
HighWayAddLocate(_idx,HighWayAddLocateFunc);
function HighWayAddLocateFunc(result){

    if(result.out == 'continue'){
        _idx ++;
        if(_idx % 100 == 0)
            console.log('\tidx : ' + _idx );

        HighWayAddLocate(_idx,HighWayAddLocateFunc);
    } else if(result.out == 'end'){
        console.log('FINISH : [TOTAL - ' + _idx);
    }
}


function HighWayAddLocate(index, func){
    getHighWayData(index,index,function(data){
        if(data.success == false){
            if(data.Data == 'OVER') {
                console.log("END");
                func({
                    out:'end',
                    index : index,
                })
                return;
            }
        }
        for(var i = 1 ; i < data.data.length ; i ++){
            var number =data.data[i].numbers ;
            var id = data.data[i].id;
            var postNum = number.slice(83,89);

            getPostNumberToAddress(postNum, function(data){
                var address ;
                if(data.success) address = data.DATA[0]['주소']
                else {
                    address = "NO ADDRESS"
                    //console.log(postNum , 'has no address data');
                }

                var multi = db.multi();
                multi.select(0);
                multi.hset(id,'address',address);
                multi.exec(function(err,rep){
                    func({
                        out:'continue',
                        index : index,
                    })
                })

            })

        }
    })
}


function getHighWayData(start,end, func){
    var multi = db.multi();
    multi.select(2);
    multi.hgetall("Text:Header");
    multi.exec(function (err, rep) {
        var dataCount = Number(rep[1].count);
        if (dataCount < start) {
            func({
                success:false,
                Data : "OVER",
            })
            return;
        } else if (end > dataCount) {
            end = dataCount;
        }

        db.zrange("Text:List", start, end, function (err, rep) {
            multi = db.multi();
            multi.select(0);
            for (var i = 0; i < rep.length; i++) {
                multi.hgetall(rep[i]);
            }
            multi.exec(function (err, rep) {
                if (err != null) {
                    func({
                        success:false,
                    })
                    return;
                }
                func({
                    success:true,
                    data:rep,
                })

            })
        })

    })
}
router.get('/RawData/HighWay', function(req,res){
    var start = req.query.start;
    var count = req.query.count;
    var format = req.query.format;

    console.log(count);
    if (start === undefined || start === "") start = 0;
    if (count === undefined || count === "") count = 100;
    if (count > 10000) count = 10000;
    if (format === undefined || format === "") format = "json";

    var end = Number(start) + Number(count);
    getHighWayData(start,end,function(data){

        if(!data.success) {
            res.send('ERROR');
            res.end();
            return;
        }
        var rep = data.data;
        if(format === "csv"){
            var result = "<pre>\n";
            for(var i = 0; i < rep.length ; i ++){
                if(rep[i].id == undefined) continue;
                result += rep[i].id + "\t" + "\t" + rep[i].body + "\t"+ rep[i].address +"\n";
            }
            result += "</pre>";
            res.send(result);
        } else {
            var json = JSON.stringify(rep, null, "\t");
            var result = "<pre>\n";
            result += json;
            result += "\n</pre>";
            res.send(result);
        }
    })

});
router.get('/RawData/All', function (req, res) {
    var start = req.query.start;
    var count = req.query.count;
    var format = req.query.format;

    console.log(count);
    if (start === undefined || start === "") start = 0;
    if (count === undefined || count === "") count = 100;
    if (count > 10000) count = 10000;
    if (format === undefined || format === "") format = "json";

    var multi = db.multi();
    var end = Number(start) + Number(count);
    console.log("final start : " + start + " , end : " + end);
    multi.select(0);
    multi.hgetall("Text:Header");
    multi.exec(function (err, rep) {
        var dataCount = Number(rep[1].count);
        if (dataCount < start) {
            res.send("OVER REQUEST INDEX");
            return;
        } else if (end > dataCount) {
            end = dataCount;
        }

        db.zrange("Text:List", start, end, function (err, rep) {
            multi = db.multi();
            for (var i = 0; i < rep.length; i++) {
                multi.hgetall(rep[i]);
            }
            multi.exec(function (err, rep) {
                if (err != null) {
                    res.send("ERROR");
                    return;
                }
                if(format === "csv"){
                    var result = "<pre>\n";
                    result += "id\t\tnumbers\t\t\t\t\t\t\t\t\t\t\t\t\t\tbody\n";
                    for(var i = 0; i < rep.length ; i ++){
                        result += rep[i].id + "\t" + rep[i].numbers + "\t" + rep[i].body + "\n";
                    }
                    result += "</pre>";
                    res.send(result);
                } else {
                    var json = JSON.stringify(rep, null, "\t");
                    var result = "<pre>\n";
                    result += json;
                    result += "\n</pre>";
                    res.send(result);
                }

            })
        })

    })

});

function makeHighwayData(start, count) {
    var multi = db.multi();
    var end = Number(start) + Number(count - 1);
    multi.select(0);
    multi.hgetall("Text:Header");
    multi.exec(function (err, rep) {
        var dataCount = Number(rep[1].count);
        if (dataCount < start) {
            console.log("OVER REQUEST INDEX");
            return;
        } else if (end > dataCount) {
            end = dataCount;
        }
        db.zrange("Text:List", start, end, function (err, rep) {
            multi = db.multi();
            for (var i = 0; i < rep.length; i++) {
                multi.hgetall(rep[i]);
            }
            multi.exec(function (err, rep) {
                var multi = db.multi();
                multi.select(2);
                for(var i = 0 ; i < rep.length ; i ++){
                    try{
                        var id = rep[i].id;
                        var index = id.split(':')[1];
                        var body = rep[i].body;
                        var isHighway = false;
                        var idx =-1;

                        idx = body.indexOf('고속 도로');
                        if(idx != -1) isHighway = true;
                        idx = body.indexOf('순환 도로');
                        if(idx != -1) isHighway = true;
                        idx = body.indexOf('고속도로');
                        if(idx != -1) isHighway = true;
                        idx = body.indexOf('순환도로');
                        if(idx != -1) isHighway = true;
                        idx = body.indexOf('순환로');
                        if(idx != -1) isHighway = true;

                        if(isHighway) {
                            multi.hincrby('Text:Header','count',1);
                            multi.zadd('Text:List',index, id);
                            HighwaydataCount ++;
                        }
                    }catch(e)
                    {
                        console.log(e);
                    }

                }
                multi.exec(function(err,rep){
                    countProgress ++;
                    console.log(HighwaydataCount + "/" +(countProgress * 10000));
                    makeHighwayData(countProgress * 10000, 10000)
                })
            });
        });
    });


}

function savePostToDatabase(idx) {
    console.log(" : " + idx);
    if(idx == posts.length) {
        console.log(' : over');
        return;
    }
    var keys = posts[idx].split('\t');
    var input = {
        '우편번호' : keys[0],
        '일렬번호' : keys[1],
        '시/도' :keys[2],
        '시군구': keys[3],
        '읍면동':keys[4],
        '리':keys[5],
        '도서':keys[6],
        '건물명':keys[7],
        '동-시작':keys[8],
        '동-끝':keys[9],
        '변경일':keys[10],
        '주소':keys[11]
    }

    var total_key = keys[0];
    var sub_key = keys[0]+':'+keys[1];
    var multi = db.multi();
    multi.select(1);
    multi.hmset(sub_key,input);
    multi.sadd(total_key,sub_key);
    multi.exec(function(err,rep){
        savePostToDatabase(++idx);
    })

}
