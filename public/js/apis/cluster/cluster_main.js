/**
 * Created by Luan on 2015. 11. 18..
 */
nv.utils.symbolMap.set('thin-x', function (size) {
    size = Math.sqrt(size);
    return 'M' + (-size / 2) + ',' + (-size / 2) +
        'l' + size + ',' + size +
        'm0,' + -(size) +
        'l' + (-size) + ',' + size;
});

document.getElementById('TextInput').placeholder =
    "group,margin,PTS\n1, 17, 101\n2, -17, 84\n3, 1, 101\n4, -1, 100\n5, -18, 90\n6, 18, 108\n7, -12, 91\n8, 12, 103\n9, -2, 106\n10, 2, 108\n11, -16, 105\n12, 16, 121\n13, -12, 95\n14, 12, 107\n15, -7, 102\n16, 7, 109\n17, 24, 104\n18, -24, 80\n19, -4, 101\n20, 4, 105\n21, -10, 79\n22, 10, 89\n23, 11, 104\n24, -11, 93\n25, -20, 99\n26, 20, 119\n27, 18, 95\n28, -18, 77\n29, -17, 89\n30, 17, 106\n31, 7, 105\n32, -7, 98\n33, 5, 95\n34, -5, 90\n35, -6, 91\n36, 6, 97\n37, -18, 102\n38, 18, 120\n39, -3, 90\n40, 3, 93\n41, 8, 97\n42, -8, 89\n43, 6, 114\n44, -6, 108\n45, -12, 81\n46, 12, 93\n47, -5, 89\n48, 5, 94\n49, -9, 94\n50, 9, 103\n51, 7, 118\n52, -7, 111\n53, 5, 109";

// create the chart
var svg;
var data = [];
function updateGraphic(d) {
    var chart;
    if (svg != null)
        svg.remove();
    delete data;
    data = [];

    var shapes = ['thin-x', 'circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
        random = d3.random.normal();

    // make data
    var t = Object.keys(d.data)[0];
    var keys = Object.keys(d.data[t]);

    for (var i = 0; i < d.cluster.nodes.length; i++) {
        var group = {
            key: 'Group ' + i,
            values: []
        };


        for (var j = 0; j < d.cluster.nodes[i].length; j++) {
            var name = d.cluster.nodes[i][j];

            if (!isNumber(d.data[name][keys[0]])) continue;
            if (!isNumber(d.data[name][keys[1]])) continue;

            group.values.push({
                name: name,
                x: Number(d.data[name][keys[0]]),
                y: Number(d.data[name][keys[1]]),
                size: 8,
                shape: 'circle'
            });
        }
        if (group.values.length != 0)
            data.push(group);

    }

    if (d.cluster.noise != null) {
        var noise = {
            key: 'Noise',
            values: []
        };

        for (var j = 0; j < d.cluster.noise.length; j++) {
            var name = d.cluster.noise[j];

            if (!isNumber(d.data[name][keys[0]])) continue;
            if (!isNumber(d.data[name][keys[1]])) continue;

            noise.values.push({
                name: name,
                x: Number(d.data[name][keys[0]]),
                y: Number(d.data[name][keys[1]]),
                size: 5,
                shape: 'circle'
            });
        }
        if (noise.values.length != 0)
            data.push(noise);
        data.push(noise);
    }


    nv.addGraph(function () {

        chart = nv.models.scatterChart()
            .showDistX(true)
            .showDistY(true)
            .useVoronoi(true)
            .color(d3.scale.category10().range())
            .duration(300)
        ;
        chart.dispatch.on('renderEnd', function () {
            console.log('render complete');
        });

        chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));

        svg = d3.select('#renderer').append('svg');
        svg.datum(data)
            .call(chart);

        //nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function (e) {
            ('New State:', JSON.stringify(e));
        });
        return chart;
    });


}


var currentSelect = "KMeans";
function onClickKMeans() {
    currentSelect = "KMeans";
    console.log("onClickKMEAN")
    document.getElementById("divKmeans").style.display = "inline";
    document.getElementById("divDBScan").style.display = "none";
    document.getElementById("divOptics").style.display = "none";
}
function onClickDBScan() {
    currentSelect = "DBScan";
    document.getElementById("divKmeans").style.display = "none";
    document.getElementById("divDBScan").style.display = "inline";
    document.getElementById("divOptics").style.display = "none";
}
function onClickOptics() {
    currentSelect = "Optics";
    document.getElementById("divKmeans").style.display = "none";
    document.getElementById("divDBScan").style.display = "none";
    document.getElementById("divOptics").style.display = "inline";
}


function onCluster() {
    console.log("on cluster : " + currentSelect)
    var text = document.getElementById('TextInput').value;
    if (text == null || text == '')
        text = document.getElementById('TextInput').placeholder;
    var post = {};
    post.data = text;
    switch (currentSelect) {
        case "KMeans":
            post.meanCount = document.getElementById("KMeansMeansCount").value;
            post.meanIter = document.getElementById("KMeansIterCount").value;
            console.log(post);
            break;
        case "DBScan":
            post.radius = document.getElementById("DBScanRadius").value;
            post.points = document.getElementById("DBScanPoints").value;
            break;
        case "Optics":
            post.radius = document.getElementById("OpticsRadius").value;
            post.points = document.getElementById("OpticsPoints").value;
            break;
    }
    $.post('/apis/cluster/' + currentSelect, post,
        function (d) {
            console.log(d);
            document.getElementById('JSONOutput').innerHTML = JSON.stringify(d, null, 4);
            updateGraphic(d);


        })

}

