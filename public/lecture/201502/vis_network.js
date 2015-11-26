/**
 * Created by hyunwoo on 11/24/15.
 */
/**
 * Created by Luan on 2015. 11. 19..
 */
function renderer() {
    var network;
    var allNodes;
    var highlightActive = false;
    var nodesDataset//; = new vis.DataSet(nodes); // these come from WorldCup2014.js
    var edgesDataset//; = new vis.DataSet(edges); // these come from WorldCup2014.js
    // create a network
    function render() {
        nodesDataset = new vis.DataSet(nodes);
        edgesDataset = new vis.DataSet(edges);
        console.log('NODE COUNT : ' + nodes.length);
        console.log('EDGE COUNT : ' + edges.length);

        console.log('render');
        var container = document.getElementById('renderer');
        var physic_forceAtlas =  {
            stabilization: false,
            "forceAtlas2Based": {
                "springLength": 100
            },
            "minVelocity": 0.75,
            "solver": "forceAtlas2Based",
            "timestep": 0.15
        }
        var physic_barneshut =  {
            stabilization: false,
            barnesHut: {
                gravitationalConstant: -20000,
                springConstant: 1,
                springLength: 200
            },
        }
        var options = {
            nodes: {
                shape: 'dot',
                scaling: {
                    min: 25,
                    max: 55,
                    label: {
                        min: 20,
                        max: 40,
                        drawThreshold: 12,
                        maxVisible: 20
                    }
                },
                font: {
                    size: 13,
                    face: 'Tahoma',
                    color: '#222222'
                }
            },
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.18
                },
                maxVelocity: 146,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
                stabilization: {iterations: 150}
            },
        };
        var data = {nodes:nodesDataset, edges:edgesDataset} // Note: data is coming from ./datasources/WorldCup2014.js
        network = new vis.Network(container, data, options);
// get a JSON object
        allNodes = nodesDataset.get({returnType:"Object"});
        network.on("click",neighbourhoodHighlight);
        /*
         network.on("stabilizationProgress", function (params) {
         var maxWidth = 496;
         var minWidth = 20;
         var widthFactor = params.iterations / params.total;
         var width = Math.max(minWidth, maxWidth * widthFactor);
         document.getElementById('bar').style.width = width + 'px';
         document.getElementById('text').innerHTML = Math.round(widthFactor * 100) + '%';
         });
         network.once("stabilizationIterationsDone", function () {
         document.getElementById('text').innerHTML = '100%';
         document.getElementById('bar').style.width = '496px';
         document.getElementById('loadingBar').style.opacity = 0;
         // really clean the dom element
         setTimeout(function () {
         document.getElementById('loadingBar').style.display = 'none';
         }, 500);
         });*/
    }
    function neighbourhoodHighlight(params) {
        // if something is selected:
        if (params.nodes.length > 0) {
            highlightActive = true;
            var i,j;
            var selectedNode = params.nodes[0];
            var degrees = 2;
            // mark all nodes as hard to read.
            for (var nodeId in allNodes) {
                allNodes[nodeId].color = 'rgba(200,200,200,0.5)';
                if (allNodes[nodeId].hiddenLabel === undefined) {
                    allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
                    allNodes[nodeId].label = undefined;
                }
            }
            var connectedNodes = network.getConnectedNodes(selectedNode);
            var allConnectedNodes = [];
            // get the second degree nodes
            for (i = 1; i < degrees; i++) {
                for (j = 0; j < connectedNodes.length; j++) {
                    allConnectedNodes = allConnectedNodes.concat(network.getConnectedNodes(connectedNodes[j]));
                }
            }
            // all second degree nodes get a different color and their label back
            for (i = 0; i < allConnectedNodes.length; i++) {
                allNodes[allConnectedNodes[i]].color = 'rgba(150,150,150,0.75)';
                if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
                    allNodes[allConnectedNodes[i]].label = allNodes[allConnectedNodes[i]].hiddenLabel;
                    allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
                }
            }
            // all first degree nodes get their own color and their label back
            for (i = 0; i < connectedNodes.length; i++) {
                allNodes[connectedNodes[i]].color = undefined;
                if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
                    allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
                    allNodes[connectedNodes[i]].hiddenLabel = undefined;
                }
            }
            // the main node gets its own color and its label back.
            allNodes[selectedNode].color = undefined;
            if (allNodes[selectedNode].hiddenLabel !== undefined) {
                allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
                allNodes[selectedNode].hiddenLabel = undefined;
            }
        }
        else if (highlightActive === true) {
            // reset all nodes
            for (var nodeId in allNodes) {
                allNodes[nodeId].color = undefined;
                if (allNodes[nodeId].hiddenLabel !== undefined) {
                    allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
                    allNodes[nodeId].hiddenLabel = undefined;
                }
            }
            highlightActive = false
        }
// transform the object into an array
        var updateArray = [];
        for (nodeId in allNodes) {
            if (allNodes.hasOwnProperty(nodeId)) {
                updateArray.push(allNodes[nodeId]);
            }
        }
        nodesDataset.update(updateArray);
    }
    function clearProgress() {
        document.getElementById('text').innerHTML = '0%';
        document.getElementById('bar').style.width = '0px';
        document.getElementById('loadingBar').style.opacity = 1;
        document.getElementById('loadingBar').style.display = 'inline';
    }
    renderer.clearProgress = clearProgress;
    renderer.render = render;
}
