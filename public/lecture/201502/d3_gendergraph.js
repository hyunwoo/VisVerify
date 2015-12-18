/**
 * Created by hyunwoo on 12/11/15.
 */


function d3_gender() {
    var line_colors = [
        // M
        "#52c1e7",
        "#6bc7e9",
        "#7ac5e3",
        "#96ceea",
        "#add7f0",
        // W
        "#e9587e",
        "#ec738b",
        "#ef8f9e",
        "#f4b0b3",
        "#f6c2c3",
    ];
    var canvas = document.getElementById("d3_gender");
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;

    root = d3.select("#d3_gender").append("svg").attr('width', width).attr('height', height);
    var svg = root.append("g");
    var svg_foreground = root.append("g");

    var margin_left = width / 11 / 3 * 2;
    var margin_top = 50;
    var margin_bottom = 20;
    var graph_width = width / 11 / 4 * 2;
    var graph_gap = width / 11 / 4 * 2;
    var graph_per = width / 11;
    var graph_height_max = height - 100;


    var nodes = [];

    var lineGraph;
    var circles = [];
    var lines = [];
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

        for (var i = 0; i < groupinfo[g].sex.length; i++) {
            setGraphRatio(i, groupinfo[g].sex[i] / groupinfo[g].maxSex);
        }
    }

    function timeText(n) {
        return n > 9 ? "" + n : "0" + n;
    }

    function setGraphRatio(i, ratio) {
        var t = graph_height_max * ratio;
        if (t < graph_gap / 3 * 2) t = graph_gap / 3 * 2;
        var h = graph_height_max + 20 - t;
        circles[i]
            .transition(1000).attr('cy', h + margin_top);
        lines[i]
            .transition(1000).attr('y2', h + margin_top);
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
                .attr('y1', graph_height_max + 20 - graph_height_max / 10 * i + margin_top)
                .attr('x2', width - margin_left)
                .attr('y2', graph_height_max + 20 - graph_height_max / 10 * i + margin_top)
                .attr('stroke', '#625757')
                .attr('opacity', 0.15)
                .attr('stroke-width', '0.5px')


            var each_height = Math.random() * graph_height_max;
            var top_gap = graph_height_max - each_height;
        }

        for (var i = 0; i < 10; i++) {
            svg.append('line')
                .attr('x1', margin_left + graph_per * i + graph_width / 2)
                .attr('y1', graph_height_max / 20 + margin_top)
                .attr('x2', margin_left + graph_per * i + graph_width / 2)
                .attr('y2', graph_height_max + 20 + margin_top)
                .attr('stroke', '#625757')
                .attr('opacity', 0.25)
                .attr('stroke-width', '0.5px')

            svg.append('text')
                .attr('y', graph_height_max + 32 + margin_top)
                .attr('x', margin_left + graph_per * i + graph_width / 2)
                .text((i < 5 ? "M" : "W") + timeText(20 + 10 * (i % 5)))
                .attr('font-size', graph_per / 5)
                .attr("fill", '#2f2f2f')
                .attr('text-anchor', 'middle')

            var each_line = svg.append('line')
                .attr('x1', margin_left + graph_per * i + graph_width / 2)
                .attr('y1', graph_height_max + 20 + margin_top)
                .attr('x2', margin_left + graph_per * i + graph_width / 2)
                .attr('y2', graph_height_max + 20 + margin_top)
                .attr('stroke', line_colors[i])
                .attr('stroke-width', graph_per / 3 * 1.25)

            var each_circle = svg.append('circle')
                .attr('cx', margin_left + graph_per * i + graph_width / 2)
                .attr('cy', 100 + margin_top)
                .attr('fill', line_colors[i])
                .attr('r', graph_per / 6 * 1.25)


            lines.push(each_line);
            circles.push(each_circle);
        }


        console.log(val);
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


    d3_gender.initialize = initialize;
    d3_gender.draw = draw;
}