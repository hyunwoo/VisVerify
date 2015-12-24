/**
 * Created by hyunwoo on 12/11/15.
 */


function d3_time() {
    var canvas = document.getElementById("d3_time");
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;

    root = d3.select("#d3_time").append("svg").attr('width', width).attr('height', height);
    var svg = root.append("g");
    svg.append('text')
        .attr('x',width/2)
        .attr('y',14)
        .text('The Number of Approval by Time')
        .attr('fill','#e8e8e8')
        .attr('font-size','12px')
        .attr('text-anchor', 'middle')
    var svg_foreground = root.append("g");

    var margin_left = width / 25 / 3 * 2;
    var margin_top = 10;
    var margin_bottom = 20;
    var graph_width = width / 25 / 4 * 2;
    var graph_gap = width / 25 / 4 * 2;
    var graph_per = width / 25;
    var graph_height_max = height - 50;

    var nodes = [];

    var lineGraph;
    var circles = [];
    var max_text;

    function draw(g) {
        if (lineGraph != null) lineGraph.remove();

        var numeric_d = makeLineData(g);
        numeric_d.push({
            x: margin_left + graph_per * 23 + graph_gap / 2,
            y: graph_height_max + 20

        });

        numeric_d.push({
            x: margin_left + graph_per * 0 + graph_gap / 2,
            y: graph_height_max + 20
        });

        lineGraph = svg.append("svg:path")
            .attr("d", makeLineGraphData(numeric_d))
            .attr("stroke", "#FFFFFF")
            .attr('stroke-width', 1)
            .attr('stroke-opacity', 1)
            .attr('fill', '#354457')
            .attr('opacity', 0.75)

        if (max_text != null) max_text.remove();
        max_text = svg.append('g');
        var perMax = groupinfo[g].maxTime / group_count[g];
        for (var i = 1; i < 11; i++) {
            max_text.append('text')
                .attr('y', graph_height_max + 20 - graph_height_max / 10 * i + 2)
                .attr('x', margin_left + 3)
                .text(Math.floor(perMax / 10 * i))
                .attr('font-size', 7)
                .attr("fill", '#e8e8e8')
                .attr('text-anchor', 'end')

        }
        for (var i = 0; i < numeric_d.length - 2; i++) {
            circles[i].transition(1000).attr('cx', numeric_d[i].x)
                .attr('cy', numeric_d[i].y)
        }
    }

    function timeText(n) {
        return n > 9 ? "" + n : "0" + n;
    }


    var makeLineGraphData =
        d3.svg.line()
            .x(function (d) {
                var x = d.x;
                return x;
            })
            .y(function (d) {
                var y = d.y;
                return y;
            })
            .interpolate('linear');

    function initialize() {
        var val = makeLineData(0);

        // draw grid
        for (var i = 0; i < 11; i++) {
            svg.append('line')
                .attr('x1', margin_left)
                .attr('y1', graph_height_max + 20 - graph_height_max / 10 * i)
                .attr('x2', width - margin_left)
                .attr('y2', graph_height_max + 20 - graph_height_max / 10 * i)
                .attr('stroke', '#e8e8e8')
                .attr('opacity', 0.15)
                .attr('stroke-width', '0.5px')


            var each_height = Math.random() * graph_height_max;
            var top_gap = graph_height_max - each_height;
        }

        for (var i = 0; i < 24; i++) {
            var each = svg_foreground.append('circle')
                .attr('cx', margin_left + graph_per * i + graph_gap / 2)
                .attr('cy', 0)
                .attr('fill', '#ffffff')
                .attr('r', graph_gap / 3);
            circles.push(each);

            svg.append('line')
                .attr('x1', margin_left + graph_per * i + graph_width / 2)
                .attr('y1', graph_height_max / 20)
                .attr('x2', margin_left + graph_per * i + graph_width / 2)
                .attr('y2', graph_height_max + 20)
                .attr('stroke', '#e8e8e8')
                .attr('opacity', 0.25)
                .attr('stroke-width', '0.5px')

            svg.append('text')
                .attr('y', graph_height_max + 32)
                .attr('x', margin_left + graph_per * i + graph_width / 2)
                .text(timeText(i))
                .attr('font-size', 9)
                .attr("fill", '#e8e8e8')
                .attr('text-anchor', 'middle')
        }

    }
    function makeLineData(g) {
        var info = groupinfo[g];
        var output = [];
        for (var i = 0; i < 24; i++) {
            var each_height = info.time[i] / info.maxTime * graph_height_max - 20;
            var top_gap = graph_height_max - each_height;
            output.push({
                x: margin_left + graph_per * i + graph_gap / 2,
                y: top_gap,
            });
        }
        return output;
    }

    d3_time.initialize = initialize;
    d3_time.draw = draw;
}