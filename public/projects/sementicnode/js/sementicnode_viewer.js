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

var circle = svg.append("circle")
    .attr("cx", 500)
    .attr("cy", 300)
    .attr("r", 50)
    .style("fill", "#000000")
    .style("pointer-events", "all");


var ellipse = svg.append("ellipse")
    .attr("cx", 300)
    .attr("cy", 500)
    .attr("rx", 50)
    .attr("ry", 20)
    .style("fill", "#000000")
    .style("pointer-events", "all");


var noline = svg.append("line")
    .attr("x1", 0)
    .attr("y1", 300)
    .attr("x2", 200)
    .attr("y2", 50)
    .style("fill", "#000000")
    .style("pointer-events", "all");

var line = svg.append("line")
    .attr("x1", 300)
    .attr("y1", 50)
    .attr("x2", 500)
    .attr("y2", 50)
    .attr("stroke-width", 2)
    .attr("stroke", "black");


var polyline = svg.append("polyline")
    .attr('points',[10,210,10,300,100,300,10,210])
    .attr("stroke-width", 2)
    .attr("stroke", "black")
    .attr("fill", "none");


