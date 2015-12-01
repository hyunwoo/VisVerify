/**
 * Created by Luan on 2015. 11. 19..
 */
function renderer() {
    var network;
    var allNodes;
    var highlightActive = false;
    var nodes;
    var nodesDataset//; = new vis.DataSet(nodes); // these come from WorldCup2014.js
    var edgesDataset//; = new vis.DataSet(edges); // these come from WorldCup2014.js

    var originNodes = {};
    // create a network


    function render(d) {
        nodes = d.nodes;
        if (d !== undefined) {
            nodesDataset = new vis.DataSet(d.nodes);
            edgesDataset = new vis.DataSet(d.edges);


        } else return;
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
                font: {
                    size: 16,
                    face: 'Lato',
                }
            },
            edges: {
                width: 0.15,
                color: {inherit: 'from'},
                "smooth": {
                    type: 'continuous',
                    roundness: 0,
                    //"forceDirection": "vertical"
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
                stabilization: {iterations: 350}
            }
        };
        var data = {nodes: nodesDataset, edges: edgesDataset} // Note: data is coming from ./datasources/WorldCup2014.js


        network = new vis.Network(container, data, options);

        // get a JSON object
        allNodes = nodesDataset.get({returnType: "Object"});

        var keys = Object.keys(allNodes);
        for(var i = 0 ; i < keys.length ; i ++){
            var node = allNodes[keys[i]];
            originNodes[keys[i]] = node;
        }

        //network.on("click",selectNodeEvent);
        network.on("click", deleteNodeEvent);

        network.on("stabilizationProgress", function (params) {
            var widthFactor = params.iterations / params.total;
            setProgress((params.iterations / params.total * 85 + 15).toFixed(0));
            setDescription('network stabilization : now iterating');
        });
        network.once("stabilizationIterationsDone", function () {
            // really clean the dom element
            console.log('loadover');
            upset.initialize(nodes);
            setProgress(100);
            setTimeout(500, modalOff());
        });

    }

    function selectNodes() {

    }

    function deleteNodeEvent(params) {
        if (params.nodes.length > 0) {
            deleteList();
            highlightActive = true;
            var selectedNode = params.nodes[0];
            deleteNode([selectedNode]);
        }
    }

    function deleteNode(idxs) {
        for (var i = 0; i < idxs.length; i++) {
            console.log('delete : ' + idxs[i] , originNodes[idxs[i]]);
            console.log(nodes[idxs[i]]);
            try {
                nodesDataset.remove({id: idxs[i]});
            }
            catch (err) {
                alert(err);
            }
        }

        setTimeout(addNode(idxs),1000);
    }

    function addNode(idxs){
        for (var i = 0; i < idxs.length; i++) {
            console.log('add : ' + idxs[i] , originNodes[idxs[i]]);
            try {
                nodesDataset.add(originNodes[idxs[i]]);
            }
            catch (err) {
                alert(err);
            }
        }

    }


    function selectGroup(params) {
        var updateArray = [];
        for (nodeId in allNodes) {
            if (Number(allNodes[nodeId].category) === 2) {

            } else {
                console.log(nodeId);
                allNodes[nodeId].color = '#3f3f3f';
            }
        }
        updateNodeData();
    }


    function nodeHighlightOn(idxs) {
        clear();
        for (nodeId in allNodes) {
            allNodes[nodeId].color = '#3f3f3f';
            allNodes[nodeId].font = '16px Tahoma #3f3f3f;'
        }

        if (idxs !== undefined) {
            for (var i = 0; i < idxs.length; i++) {
                allNodes[idxs[i]].color = allNodes[idxs[i]].saved_color;
            }
        }
        updateNodeData();
    }

    function clear() {
        highlightActive = false;
        deleteList();
        for (var nodeId in allNodes) {
            allNodes[nodeId].color = allNodes[nodeId].saved_color;
        }
        updateNodeData();
    }


    function selectNodeEvent(params) {
        if (params.nodes.length > 0) {
            var node;
            deleteList();
            highlightActive = true;
            var selectedNode = params.nodes[0];

            for (nodeId in allNodes) {
                allNodes[nodeId].color = '#3f3f3f';
                allNodes[nodeId].font = '16px Tahoma #3f3f3f;'
            }

            allNodes[selectedNode].color = allNodes[selectedNode].saved_color;


            node = allNodes[selectedNode];
            appendListItem(node);


            var connectedNodes = network.getConnectedNodes(selectedNode);
            for (var i = 0; i < connectedNodes.length; i++) {
                var idx = connectedNodes[i];
                node = allNodes[idx];
                allNodes[idx].color = allNodes[idx].saved_color;
                allNodes[idx].font = '16px Tahoma ' + allNodes[idx].saved_color;
                appendListItem(node);
            }
            console.log(allNodes[selectedNode]);
        } else if (highlightActive === true) {
            deleteList();
            // reset all nodes
            for (var nodeId in allNodes) {
                allNodes[nodeId].color = allNodes[nodeId].saved_color;
                if (allNodes[nodeId].hiddenLabel !== undefined) {
                    allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
                    allNodes[nodeId].hiddenLabel = undefined;
                }
            }
            highlightActive = false
        }

        updateNodeData();


    }

    function updateNodeData() {
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

    upset.setUpsetDelegate(nodeHighlightOn, clear);

    renderer.clearProgress = clearProgress;
    renderer.render = render;


}
