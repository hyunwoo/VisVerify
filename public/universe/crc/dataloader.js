
function reloadProteinData(a) {
    console.log(a);
}

function requestData(id) {
    var nodes = [];
    var edges = [];
    var url = '/universe/crc/data/gonetwork/' + id + '.json';
    $.get(url, function (body, err) {
        if (err == 'success') {
            requestData.data = body;
            var idx = id.indexOf("_");
            var name = id.slice(idx + 1, id.length);
            makeNetwork(name, id)
        }
    })
}

var nodes;
var edges;
var network;

var progressbar = document.getElementById("progress_bar");
var progressText = document.getElementById("progress_text");
var progressPercent = document.getElementById("progress_percent");
var progressModal = document.getElementById("progress_modal");

var proteinName = document.getElementById("protein_name");
var proteinNode = document.getElementById("protein_node");
var proteinEdge = document.getElementById("protein_edge");

var dispProteinName = document.getElementById("disp_protein_name");
var dispProteinNodeCnt = document.getElementById("disp_protein_node_cnt");
var dispProteinEdgeCnt = document.getElementById("disp_protein_edge_cnt");

var dispLinkedList = document.getElementById('connectListGroup');

function makeNetwork(name, origin_id) {

    progressModal.style.display = 'inline';
    progressbar.style.width = "0%";

    if (nodes != null) nodes.clear();
    if (edges != null) edges.clear();

    delete nodes;
    delete edges;

    var node_count = requestData.data.nodeCount;
    var edge_count = requestData.data.edgeCount;


    dispProteinName.innerHTML = name;
    proteinName.innerHTML = "Protein Code : " + name;
    dispProteinNodeCnt.innerHTML = proteinNode.innerHTML = "Protein - " + node_count + " Nodes";
    dispProteinEdgeCnt.innerHTML = proteinEdge.innerHTML = "Link - " + edge_count + " Edges";

    var id = -1;
    var tnode = requestData.data.nodes;
    var tedge = requestData.data.edges;
    for (var i = 0; i < tnode.length; i++) {
        if (tnode[i].label == name) {
            tnode[i].group = 1;
            tnode[i].size = 40;
            id = tnode[i].id;
        } else {
            tnode[i].group = 0;
            tnode[i].size = 10;
        }
    }


    for (var i = 0; i < tedge.length; i++) {
        if (tedge[i].from == id || tedge[i].to == id) {
            tedge[i].value = 10;
        }
        else tedge[i].value = 0.1;
    }


    nodes = new vis.DataSet(tnode);
    edges = new vis.DataSet(tedge);


    var container = document.getElementById('renderer');
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options;

    options = {
        "edges": {
            "smooth": {
                "forceDirection": "none",
            }
        },
        "physics": {
            "barnesHut": {
                "gravitationalConstant": -15050
            },
            "maxVelocity": 10,
            "minVelocity": 1,

            stabilization: {
                enabled: true,
                iterations: 5,
                updateInterval: 1
            }
        },
        nodes: {
            shape: 'dot',
            scaling: {
                min: 10,
                max: 10
            },
            font: {
                size: 22,
                face: 'Tahoma',
                color: '#fff'
            },

        },
        layout: {
            improvedLayout: false,
        }

    }

    network = new vis.Network(container, data, options);

    network.on("stabilizationProgress", function (params) {
        var progressing = (params.iterations / params.total * 100).toFixed(2) + "%";
        progressbar.style.width = progressing;
        progressPercent.innerHTML = progressing + " Loaded";
        progressText.innerHTML = "(" + params.iterations + "/" + params.total + ")";
    });

    network.once("stabilizationIterationsDone", function () {
        setTimeout(function () {
            progressModal.style.display = 'none';
            progressPercent.innerHTML = "100% Loaded";
        }, 500);

    });

    network.on("click", function (params) {
        if (dispLinkedList.childNodes != null) {
            var count = dispLinkedList.childNodes.length;
            for (var i = 0; i < count; i++) {
                dispLinkedList.removeChild(dispLinkedList.childNodes[0]);
            }
        }

        if (params.nodes.length == 0) return;
        var nodeId = params.nodes[0];

        var connectStruct = {};
        for (var i = 0; i < tedge.length; i++) {

            if (tedge[i].from == nodeId) {
                var fromId = tedge[i].from;
                var toId = tedge[i].to;
                for (var j = 0; j < tnode.length; j++) {
                    if (tnode[j].id == toId || tnode[j].id == fromId)
                        connectStruct[tnode[j].id] = tnode[j];
                }
            }
        }

        var keys = Object.keys(connectStruct);
        for(var i = 0 ; i < keys.length ; i ++){
            var data = connectStruct[keys[i]];
            var linkbody = document.createElement("div");
            var head = document.createElement("h4");
            head.className = "c4 bold";
            head.innerHTML =  data.label;
            var body = document.createElement("h5");
            body.className = "c4 light";
            body.innerHTML =  'ID : ' + data.id + " , SIZE : " + data.size;
            var hr = document.createElement("hr");

            linkbody.appendChild(head);
            linkbody.appendChild(body);
            linkbody.appendChild(hr);

            dispLinkedList.appendChild(linkbody);

        }




    });


}
