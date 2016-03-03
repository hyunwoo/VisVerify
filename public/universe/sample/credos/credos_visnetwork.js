/**
 * Created by Hyunwoo on 2016. 3. 2..
 */
var network;
var container;
var nodes;
var edges;


var options ={
    nodes: {
        shape: 'dot',
        scaling: {
            min: 10,
            max: 30
        },
        font: {
            size: 12,
            face: 'Tahoma'
        }
    },
    edges: {
        width: 0.15,
        color: {inherit: 'from'},
        smooth: {
            type: 'continuous'
        }
    },
    physics: {
        stabilization: false,
        barnesHut: {
            gravitationalConstant: -80000,
            springConstant: 0.001,
            springLength: 200
        }
    },
    interaction: {
        tooltipDelay: 200,
    }
}
function reloadNetwork(body){
    $.post('/universe/samples/credos/api/networkData', body, function(data,success){
        console.log(data,success)
        if(!success){
            return;
        }
        nodes= new vis.DataSet(data.node);
        edges= new vis.DataSet(data.edge);
        network.destroy();
        network = null;
        var container = document.getElementById('renderer');
        network = new vis.Network(container, {
            nodes:nodes,
            edges:edges,
        }, options);

        network.on("click", function (params) {
            if(params.nodes != null && params.nodes.length != 0){
                console.log(params.nodes[0])
                console.log(rawData[params.nodes[0]])
            }

        });


    })
}
function init(){

    var container = document.getElementById('renderer');

    $.post('/universe/samples/credos/api/networkData', function(data,success){
        if(!success){
            return;
        }
        nodes = new vis.DataSet(data.node);
        edges = new vis.DataSet(data.edge);

        var data = {
            nodes: nodes,
            edges: edges
        };

        network = new vis.Network(container, data, options);
        network.on("click", function (params) {
            if(params.nodes != null && params.nodes.length != 0){
                console.log(params.nodes[0])
                console.log(rawData[params.nodes[0]])
            }

        });

    })
}
function clear(){

}

init();