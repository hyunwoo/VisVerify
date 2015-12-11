/**
 * Created by Luan on 15. 10. 30..
 */

var express = require('express');
var router = express.Router();
module.exports = router;

var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();


router.get('/Prototype/01', function(req,res){
    res.render('projects/Pedigree/Prototype01');
})
router.get('/Prototype/01-1', function(req,res){
    res.render('projects/Pedigree/Prototype01-1');
})

router.get('/Prototype/02', function(req,res){
    res.render('projects/Pedigree/Prototype02');
})

router.get('/Prototype/03', function(req,res){
    res.render('projects/Pedigree/Prototype03');
})

router.get('/Prototype/04', function(req,res){
    res.render('projects/Pedigree/Prototype04');
})

router.get('/Prototype/05', function(req,res){
    res.render('projects/Pedigree/Prototype05');
})

router.get('/Prototype/06', function(req,res){
    res.render('projects/Pedigree/Prototype06');
})





var a = {
    b : 'c',
}
console.log(a);



return;
console.log(__dirname);
//return;
fs.readFile(__dirname + '/data/data.xml', function(err, data) {

    parser.parseString(data, function (err, result) {

        var StartIndex = 1;
        var EndIndex = 5;
        var Nodes = [];
        var maxDepth = 0;

        result.graphml.graph[0].node.forEach(function(node){
            var Node = {};
            for(var i = 0 ; i < node.data.length ; i ++) {
                Node[node.data[i].$.key] = node.data[i]['_'];
                //console.log(node.data[i].$.key + " : " + node.data[i]['_']);
            }
            Node.id = Number(node.$.id);
            if(Number(Node.depth) > EndIndex) {
                return;
            }

            if(Number(Node.depth) < StartIndex) {
                return;
            }

            Nodes[Number(node.$.id)] = Node;

            if(Number(Node.depth) > maxDepth) maxDepth = Number(Node.depth);
        });

        console.log(maxDepth);


        var Edges = [];
        for(var i = 0 ; i < 15000 ; i ++){
            Edges.push({
                targets :[]
            });
        }
        result.graphml.graph[0].edge.forEach(function(edge){
            var Edge = {};

            Edge.source = edge.$.source;
            Edge.target = edge.$.target;
            Edges[Edge.source].targets.push(Edge.target);
        })

        var Flats = [];
        for(var i = 1 ; i < Nodes.length ; i ++){

            if(Nodes[i] === undefined){
                continue;
            }

            Flats[Nodes[i].id] = {
                name : Nodes[i].name,
                grade : Nodes[i].grade,
                period : Nodes[i].period,
                sex : Nodes[i].sex,
                depth : Nodes[i].depth,
                grade_exam : Nodes[i].grade_exam,
                family_origin : Nodes[i].family_origin,
            }

        }

        var Sources = [];
        var Flare = {};

        Flare.name = Flats[StartIndex].name;
        Flare.size = 1;
        Flare.children = [];
        Sources[StartIndex] = Flare;

        for(var i = 0 ; i < Edges.length ; i ++){
        //for(var i = 1 ; i < 4 ; i ++){
            for(var j = 0 ; j < Edges[i].targets.length; j ++){

                var source = i;
                var target = Edges[i].targets[j];

                //console.log(source + " => " + target);

                if(Sources[i] == null || Flats[target] == null){
                    continue;
                }


                var t = {
                    name : Flats[target].name,
                    grade : Flats[target].grade,
                    period : Flats[target].period,
                    sex : Flats[target].sex,
                    depth : Flats[target].depth,
                    grade_exam : Flats[target].grade_exam,
                    family_origin : Flats[target].family_origin,
                    children : [],
                }

                Sources[source].children.push(t);
                Sources[target] = t;


            }
        }
        console.log("MAX DEPTH : " + maxDepth);

        for(var i = 1 ; i < Sources.length ; i ++){
            if(Sources[i] === undefined) continue;
            if(Sources[i].children === undefined) continue;
            if(Sources[i].children.length == 0){
                delete Sources[i].children;
            }
        }

        var string = JSON.stringify(Flare, null, 4);

        fs.writeFile(__dirname + '/data.json', string, function(err) {
            if(err) throw err;
            console.log('File write completed');
        });
        return;

        //

        var Network_Data = [];
        var NetworkDataNames = {};
        var Network_Connection = [];
        for(var i = 0 ; i < Nodes.length ; i ++){
            if(Nodes[i] == null) continue;
            Network_Data.push({
                name :  getId(Nodes[i].name,Nodes[i].id),
                value : Number(Nodes[i].grade),
            })
            NetworkDataNames[getId(Nodes[i].name,Nodes[i].id)] = 0;
        }

        for(var i = 0 ; i < Edges.length ; i ++){
            if(Edges[i] == null) continue;
            for(var j = 0 ; j < Edges[i].targets.length; j ++){
                var source = Nodes[i];
                var target = Nodes[Edges[i].targets[j]];
                if(source == null || target == null) continue;

                var keySource = getId(source.name,source.id);
                var keyTarget = getId(target.name,target.id);

                if(NetworkDataNames[keySource] == null || NetworkDataNames[keyTarget] == null) {
                    console.log("skip : " , source + '->' +target)
                    continue;
                }

                NetworkDataNames[keySource] = 1;
                NetworkDataNames[keyTarget] = 1;

                Network_Connection.push({
                    source : getId(source.name,source.id),
                    target : getId(target.name,target.id)

                });
            }
        }

        var string_network_data = JSON.stringify(Network_Data, null, 4);
        var string_network_connection = JSON.stringify(Network_Connection, null, 4);
        string_network_data = "var network_data = " + string_network_data;
        string_network_connection = "var network_connection = " + string_network_connection;

        fs.writeFile(__dirname + '/network_data.js', string_network_data, function(err) {
            if(err) throw err;
            console.log('network_data write completed');
        });

        fs.writeFile(__dirname + 'network_connectnion.js', string_network_connection, function(err) {
            if(err) throw err;
            console.log('network_connectnion write completed');
        });
    });
});

function getId(name, id){
    return name + " (" +id+")";
}





