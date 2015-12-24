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
    var nodesDataset;
    var edgesDataset;

    function render() {
        for (var i = 0; i < nodes.length; i++) {
            switch (nodes[i].group) {
                case 0:
                    nodes[i].color = '#3780bb';
                    break;
                case 9:
                    nodes[i].color = '#4ebabb';
                    break;
                case 7:
                    nodes[i].color = '#8555a3';
                    break;
                case 2:
                    nodes[i].color = '#f4c221';
                    break;
                case 6 :
                    nodes[i].color = '#e14046';
                    break;
                case 11 :
                    nodes[i].color = '#ebe57c';
                    break;
                case 10 :
                    nodes[i].color = '#ea888d';
                    break;
                case 14 :
                    nodes[i].color = '#119768';
                    break;
                case 12 :
                    nodes[i].color = '#bfb196';
                    break;
                default:
                    break;
            }
        }

        nodesDataset = new vis.DataSet(nodes);
        edgesDataset = new vis.DataSet(edges);

        for (var i = 0; i < nodes.length; i++) {
            if (group_count[nodes[i].group] == null) group_count[nodes[i].group] = 1;
            else group_count[nodes[i].group]++;
        }

        var container = document.getElementById('renderer');
        var physic_forceAtlas = {
            stabilization: false,
            "forceAtlas2Based": {
                "springLength": 100
            },
            "minVelocity": 0.75,
            "solver": "forceAtlas2Based",
            "timestep": 0.15
        }
        var physic_barneshut = {
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
                        min: 10,
                        max: 60,
                    },
                    font: {
                        size: 25,
                        color : '#FFF',
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
                    barnesHut: {
                        gravitationalConstant: -80000,
                        springConstant: 0.001,
                        springLength: 200
                    }
                }
                ,
            }

        var data = {nodes: nodesDataset, edges: edgesDataset} // Note: data is coming from ./datasources/WorldCup2014.js
        network = new vis.Network(container, data, options);
        allNodes = nodesDataset.get({returnType: "Object"});
        network.on("click", neighbourhoodHighlight);
    }

    function neighbourhoodHighlight(params) {
        // if something is selected:
        if (params.nodes.length > 0) {
            var selectedNode = params.nodes[0];
            selectGroup(allNodes[selectedNode].group);
            return;
            highlightActive = true;
            var i, j;

            var degrees = 2;
            // mark all nodes as hard to read.
            for (var nodeId in allNodes) {
                allNodes[nodeId].color = 'rgba(200,200,200,0.5)';
                if (allNodes[nodeId].hiddenLabel === undefined) {
                    allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
                    allNodes[nodeId].label = undefined;
                }
            }


            // set group highlight;

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

    function selectGroup(g) {
        d3_time.draw(g);
        d3_gender.draw(g);
        setScenario(g);

    }

    function onSetScenario(func){
        setScenario = func;
    }

    var setScenario;

    renderer.clearProgress = clearProgress;
    renderer.onSetScenario = onSetScenario;
    renderer.render = render;
}
