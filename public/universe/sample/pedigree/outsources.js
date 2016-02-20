/**
 * Created by Hyunwoo on 2016. 2. 21..
 */


var zoom = d3.behavior.zoom()
    .scaleExtent([0.6, 10])
    .on("zoom", zoomed);
function zoomed() {
    parent_svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

svg.call(zoom)