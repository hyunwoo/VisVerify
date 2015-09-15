/**
 * Created by Luan on 15. 9. 15..
 */
//var width = document.getElementById("canvas").offsetWidth,
//    height = document.getElementById("canvas").offsetHeight;

var svg = d3.select("#canvas").append("svg")
    //.attr("width", width)
    //.attr("height", height)

//console.log(width,height);
console.log(document.getElementById("#canvas"));
console.log(svg);
var rect = svg.append("rect")
    .attr("width", 100)
    .attr("height", 100)
    .attr("x", 300)
    .attr("y", 300)
    .style("fill", "#000000")
    .style("pointer-events", "all");