/**
 * Created by Hyunwoo on 2016. 2. 19..
 */
var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', function (req, res) {
    console.log("in");
    res.render('universe/project/samples/pedigree/pedigree', {useFooter :false});
})


return;
var fs = require('fs');
var readData = fs.readFileSync('/Users/Hyunwoo/Develop/WebPages/VIS/VisVerify/public/universe/sample/pedigree/pedigree_data_0219.js', 'utf8');
var data = JSON.parse(readData);
//console.log(data);


console.log({
    name: data.name,
    depth: data.depth,
    child: data.children.length,
})
var startYear = 2000;
var deathYear = 0;
function nodeChildCount(data) {
    var count = 0;
    if(data == null ) return 0;

    if (Number(data.birth) < startYear) startYear = data.birth;
    if (Number(data.death) > deathYear) deathYear = data.death;

    if (data.children == null || data.children.length == 0) {
        data.childCount = 0;
        data.totalCount = 1;
        return 1;
    }
    for (var i = 0; i < data.children.length; i++) {
        count += nodeChildCount(data.children[i]);
    }

    data.childCount = count;
    data.totalCount = count + 1;
    return data.totalCount;
}

function nodeMakeSize(data){
    var powValue = 6;
    if(data.children == null || data.children.length == 0){
        data['totalChildSize'] = 0;
        var val = Math.pow(data.size, powValue);
        data['totalSize'] = val;
        data['refineSize'] = val;
        console.log(data['refineSize']);
        return val;
    }
    var childSize = 0;
    for(var i = 0 ; i < data.children.length ; i ++){
        childSize = Number(childSize) +  Number(nodeMakeSize(data.children[i]));
    }


    data['totalChildSize'] = childSize;
    data['refineSize'] =  Math.pow(data.size, powValue);
    data['totalSize'] = Number(data['totalChildSize']) + Number(data['refineSize']);

    return data['totalSize'];
}


nodeChildCount(data)
nodeMakeSize(data);
console.log(startYear ,deathYear)
fs.writeFile('/Users/Hyunwoo/Develop/WebPages/VIS/VisVerify/' +
    'public/universe/sample/pedigree/pedigree_data_haschild.js',
    'var data = ' + JSON.stringify(data, null, 2), 'utf8', function (err, res) {
        console.log(err, res);
    })
return;