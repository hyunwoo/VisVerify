/**
 * Created by Hyunwoo on 2016. 3. 8..
 */

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
    console.log("in");

    res.render('universe/project/netppl/gonetwork', {useFooter :false, items:items});
})


var fs = require('fs');
function loadData() {
    var output = {
        RawData : [],
        Network : [],
    }
    fs.readFile('./Data/rsm_credos.csv', function(err,data){
        console.log(err,data);
        data = data.toString();
        var lines = data.split('\n');


        var keys = lines[0].split(',');
        for(var i = 1 ; i < lines.length ; i ++){
            var node = {};
        }
        output.RawData.push();


        console.log(keys)
    })

}
loadData();

