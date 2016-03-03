/**
 * Created by Hyunwoo on 2016. 3. 2..
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var kmeans = require('node-kmeans');
var similarity = require( 'compute-cosine-similarity' );
module.exports = router;

console.log('start credos data prepare')
console.log(__dirname);




var data = JSON.parse(fs.readFileSync(__dirname + "/credos_record_4+_indexed.json"));
// need base group


console.log('read complete')
// need node link
router.get('/', function (req, res) {
    console.log("in");
    res.render('universe/project/samples/credos/credos_main', {useFooter :false});
})

/**
 *  정보
 *  음주, 흡연, 가족력
 *  상태(기관)
 *  상태(정신)
 *  증상-의료
 *  복용약
 *  증상-일상
*/

router.post('/api/networkData', function(req, res){
    var query = req.body;
    console.log(query);
    var select_template=  [false,true,true,false,false,false,false];
    var keys = Object.keys(query);

    var truecount = 1;
    if(keys == null || keys.length == 0) {
        select_template=  [false,true,true,false,false,false,false];
    } else {
        select_template=  [false,true,false,false,false,false,false];
        truecount = 0;
        for(var i = 0 ; i < keys.length ; i ++){
            select_template[keys[i]] = true;
            truecount ++;
        }
    }

    console.log(select_template)



    function createNode(d, limit, func) {
        console.log(limit)
        var nodeData =[];
        var edgeData = [];
        var kArr = [];
        for(var j = 0 ; j < data.length ; j ++) {
            var arr = [];
            for (var i = 0; i < d.length; i++) {
                if (d[i]) {
                    if (arr.length == 0) arr = data[j].groupdata.values[0][i];
                    else arr = arrayCombine(arr, data[j].groupdata.values[0][i])
                }
            }
            kArr.push(arr);
            nodeData.push({
                id : j,
                group : 0,
                label : data[j]['정보'].values[0][0],
            })
        }



        //var kcount = Math.floor(Math.sqrt(data.length / 2));
        var kcount = 6;
        kmeans.clusterize(kArr, {k: kcount}, function(err,res) {
            if (err) func(null);
            else {
                for(var i = 0 ; i < res.length ; i ++){
                    for(var j = 0 ; j < res[i].clusterInd.length ; j ++){
                        nodeData[res[i].clusterInd[j]].group = i;
                    }
                }

                for(var i = 0 ; i < kArr.length ; i ++){
                    var perEdge = 0;
                    for(var j = i + 1 ;j < kArr.length ; j ++){
                        var simil = similarity(kArr[i], kArr[j]);

                        var cut = limit;
                        if(nodeData[i].group == nodeData[j].group[j]) cut = limit ;
                        if(simil > cut ){
                            perEdge ++;
                            edgeData.push({
                                from : i ,
                                to : j,
                            })
                        }

                        if(perEdge > 3) break;


                    }

                    for(var j = 0 ; j < 2 ; j ++) {
                        var rand = res[nodeData[i].group].clusterInd[Math.floor(Math.random() * res[nodeData[i].group].clusterInd.length)];
                        edgeData.push({
                            from : i ,
                            to : rand,
                        })

                        console.log('rand ! :' + rand)
                    }
                }

                func({
                    node : nodeData,
                    edge : edgeData,
                })
            }
        });
    }



    createNode(select_template, 0.85 - Math.pow(truecount, 2) * 0.01 , function(network_data){
        if(network_data == null){
            res.send(null);
        } else {
            res.send(network_data);
        }

    });
})


router.get('/api/rawData', function(req,res){
    res.send(data);
})
function arrayCombine(arr1, arr2) {
    return JSON.parse('[ ' + arr1 + ' , ' + arr2 + ']');
}