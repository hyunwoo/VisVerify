/**
 * Created by hyunwoo on 2015-04-26.
 */

/*SIGMA JSON TYPE */
/** SIGMA DATA TYPE EXAMPLE
 {
  "nodes": [
    {
      "id": "n0",
      "label": "A node",
      "x": 0,
      "y": 0,
      "size": 3
    },
  ],
  "edges": [
    {
      "id": "e0",
      "source": "n0",
      "target": "n1"
    },
  ]
}
 */
exports.CsvToSigmaJSON = function (inCsv,calc) {
    var result = {};
    result.nodes = [];
    result.edges = [];
    var x_count = Object.keys(inCsv[0]).length;
    var edgeCount = 0;
    for (var i = 0; i < inCsv.length; i++) {
        result.nodes.push({
            id : "n"+i,
            label: inCsv[i][0],
            x : Math.random(),
            y : Math.random(),
            size : Math.random(),
            color : '#000'
        })


        for (var j = i + 1; j < inCsv.length; j++) {
            var samely = 0;

            if (i == j) continue;
            for (var k = 1; k < x_count; k++) { // no check name
                if (inCsv[i][k] == 0) continue;
                if (inCsv[i][k] == inCsv[j][k]) {
                    samely++;
                }
            }
            var link_value = calc(samely, x_count);
            if (link_value != 0) {
                result.edges.push({
                    id : "e"+edgeCount,
                    source: "n"+i,
                    target: "n"+j,
                    size: link_value,
                    color : '#ccc'
                })
                edgeCount ++;
            }
        }


    }
    return result;
}

/* D3JS JSON TYPE */
/**
 {
     "nodes":[
     {"name":"Myriel","group":1},
     "links":[
     {"source":1,"target":0,"value":1},
 }
 */
exports.CsvToD3JSJSON = function (inCsv, calc) {
    var result = {};
    result.nodes = [];
    result.links = [];
    var x_count = Object.keys(inCsv[0]).length;
    for (var i = 0; i < inCsv.length; i++) {
        result.nodes.push({
            name: inCsv[i][0],
            group: inCsv[i][1]
        })

        for (var j = i + 1; j < inCsv.length; j++) {
            var samely = 0;

            if (i == j) continue;
            for (var k = 1; k < x_count; k++) { // no check name
                if (inCsv[i][k] == 0) continue;
                if (inCsv[i][k] == inCsv[j][k]) {
                    samely++;
                }
            }
            var link_value = calc(samely, x_count);
            if (link_value != 0) {
                result.links.push({
                    source: i,
                    target: j,
                    vaule: link_value
                })
            }
        }


    }
    return result;
}
