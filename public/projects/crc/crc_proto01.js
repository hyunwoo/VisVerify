/**
 * Created by Luan on 2015. 11. 18..
 */

/**
 * This example spawns three different renderers, two of them sharing
 * their camera. Also, a ForceAtlas2 runs on the graph.
 *
 * It is basically a mashup between some other examples, to show how
 * sigma behaves when instantiated in a weird and heavy configuration.
 */

var noLinkHide = false;

var svg;

function render() {
    if (svg != null) svg.remove();
    var w = document.getElementById('renderer').offsetWidth;
    var h = document.getElementById('renderer').offsetHeight;

    var focus_node = null, highlight_node = null;

    var text_center = true;
    var outline = false;

    var min_score = 0;
    var max_score = 1;

    var color = d3.scale.linear()
        .domain([min_score, (min_score + max_score) / 2, max_score])
        .range(["#9A3E25", "#E3Ba22", "#156B90"]);

    var highlight_color = "#9A3E25";
    var highlight_trans = 0.1;

    var size = d3.scale.pow().exponent(1)
        .domain([1, 100])
        .range([8, 24]);

    var force = d3.layout.force()
        .linkDistance(130)
        .charge(-100)
        .size([w, h]);

    var default_node_color = "#bbb";
    var default_link_color = "#bbb";
    var nominal_base_node_size = 2;
    var nominal_text_size = 5;
    var max_text_size = 24;
    var nominal_stroke = 0.5;
    var max_stroke = 4.5;
    var max_base_node_size = 36;
    var min_zoom = 0.1;
    var max_zoom = 7;
    svg = d3.select("#renderer").append("svg");
    svg.style('height', h);
    var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom]).on("zoomend", onZoomEnd)

    var g = svg.append("g");
    svg.style("cursor", "move");

    var linkedByIndex = {};
    tempdata.links.forEach(function (d) {
        linkedByIndex[d.source + "," + d.target] = true;
    });

    function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }

    force
        .nodes(tempdata.nodes)
        .links(tempdata.links)
        .start();

    var link = g.selectAll(".link")
        .data(tempdata.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke", function (d) {
            if (isNumber(d.score) && d.score >= 0) return color(d.score);
            else return default_link_color;
        })

    var drag = force.drag()
        .on("dragstart", dragstart);


    var node = g.selectAll(".node")
        .data(tempdata.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(drag)
        .on("dblclick", dblclick)


    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
    }

    function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
    }


    var tocolor = "fill";
    var towhite = "stroke";
    if (outline) {
        tocolor = "stroke"
        towhite = "fill"
    }

    var circle = node.append("path")
        .attr("d", d3.svg.symbol()
            .size(function (d) {
                return Math.PI * Math.pow(size(d.size) || nominal_base_node_size, 2);
            })
            .type(function (d) {
                return d.type;
            }))

        .style(tocolor, function (d) {
            if (isNumber(d.score) && d.score >= 0) return color(d.score);
            else return default_node_color;
        })
        //.attr("r", function(d) { return size(d.size)||nominal_base_node_size; })
        .style("stroke-width", nominal_stroke)
        .style(towhite, "white");


    var text = g.selectAll(".text")
        .data(tempdata.nodes)
        .enter().append("text")
        .attr("dy", ".35em")
        .style("font-size", nominal_text_size + "px")


    if (text_center)
        text.text(function (d) {
            return d.id;
        }).style("text-anchor", "middle")
    else
        text.attr("dx", function (d) {
                return (size(d.size) || nominal_base_node_size);
            })
            .text(function (d) {
                return '\u2002' + d.id;
            });

    node.on("mouseover", function (d) {
            set_highlight(d);
        })
        .on("mousedown", function (d) {
            d3.event.stopPropagation();
            focus_node = d;
            set_focus(d)
            if (highlight_node === null) set_highlight(d)

        }).on("mouseout", function (d) {
        exit_highlight();


    });

    d3.select(window).on("mouseup",
        function () {
            if (focus_node !== null) {
                focus_node = null;
                if (highlight_trans < 1) {
                    circle.style("opacity", 1);
                    text.style("opacity", 1);
                    link.style("opacity", 1);
                }
            }

            if (highlight_node === null) exit_highlight();

        });


    function exit_highlight() {
        highlight_node = null;
        if (focus_node === null) {
            svg.style("cursor", "move");
            if (highlight_color != "white") {
                circle.style(towhite, "white");
                text.style("font-weight", "normal");
                link.style("stroke", function (o) {
                    return (isNumber(o.score) && o.score >= 0) ? color(o.score) : default_link_color
                });
            }

        }

        ;
    }

    function set_focus(d) {
        if (highlight_trans < 1) {
            circle.style("opacity", function (o) {
                return isConnected(d, o) ? 1 : highlight_trans;
            });

            text.style("opacity", function (o) {
                return isConnected(d, o) ? 1 : highlight_trans;
            });

            link.style("opacity", function (o) {
                return o.source.index == d.index || o.target.index == d.index ? 1 : highlight_trans;
            });
        }
    }


    function set_highlight(d) {
        svg.style("cursor", "pointer");
        if (focus_node !== null) d = focus_node;
        highlight_node = d;

        if (highlight_color != "white") {
            circle.style(towhite, function (o) {
                return isConnected(d, o) ? highlight_color : "white";
            });
            text.style("font-weight", function (o) {
                return isConnected(d, o) ? "bold" : "normal";
            });
            link.style("stroke", function (o) {
                return o.source.index == d.index || o.target.index == d.index ? highlight_color : ((isNumber(o.score) && o.score >= 0) ? color(o.score) : default_link_color);

            });
        }
    }

    zoom.on("zoom", function () {

        var stroke = nominal_stroke;
        if (nominal_stroke * zoom.scale() > max_stroke) stroke = max_stroke / zoom.scale();
        //link.style("stroke-width", stroke);
        circle.style("stroke-width", stroke);

        var base_radius = nominal_base_node_size;
        if (nominal_base_node_size * zoom.scale() > max_base_node_size) base_radius = max_base_node_size / zoom.scale();
        circle.attr("d", d3.svg.symbol()
            .size(function (d) {
                return Math.PI * Math.pow(size(d.size * 0.5) * base_radius / nominal_base_node_size || base_radius, 2);
            })
            .type(function (d) {
                return d.type;
            }))

        //circle.attr("r", function(d) { return (size(d.size)*base_radius/nominal_base_node_size||base_radius); })
        if (!text_center) text.attr("dx", function (d) {
            return (size(d.size) * base_radius / nominal_base_node_size || base_radius);
        });

        var text_size = nominal_text_size;
        if (nominal_text_size * zoom.scale() > max_text_size) text_size = max_text_size / zoom.scale();
        text.style("font-size", text_size + "px");

        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    });

    svg.call(zoom);
    resize();
    d3.select(window).on("resize", resize);

    force.on("tick", function () {
        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        text.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

        link.attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node.attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    });

    function resize() {
        var width = window.innerWidth, height = window.innerHeight;
        svg.attr("width", width).attr("height", height);

        force.size([force.size()[0] + (width - w) / zoom.scale(), force.size()[1] + (height - h) / zoom.scale()]).resume();
        w = width;
        h = height;
    }


    var zoomBefore = 0;

    function onZoomEnd() {
        if (zoomBefore < 1.6 && zoom.scale() > 1.6)
            textHideByZoom();
        else if (zoomBefore > 1.6 && zoom.scale() < 1.6) {
            textHideByZoom();
        }
        zoomBefore = zoom.scale();
    }


    function textHideByZoom() {

        if (zoom.scale() > 1.6) {
            text.transition().style('opacity', function (d) {
                if (!noLinkHide) {
                    if (d.size == 1) return '0';
                    else return '1';
                } else return '1';
            });
        } else
            text.transition().style('opacity', function (d) {
                return '0';
            });

    }


    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


    noLinkNodeHideMode();
    textHideByZoom();
    function noLinkNodeHideMode() {
        if (noLinkHide) {
            node.attr('display', function (d) {
                if (d.size == 1) return 'none';
                else return 'visibility';
            });

            text.attr('display', function (d) {
                if (d.size == 1) return 'none';
                else return 'visibility';
            });
        } else {
            node.attr('display', function (d) {
                if (d.size == 1) return 'visibility';
                else return 'visibility';
            });

            text.attr('display', function (d) {
                if (d.size == 1) return 'visibility';
                else return 'visibility';
            });
        }
        noLinkHide = !noLinkHide;

    }

    render.noLinkNodeHideMode = noLinkNodeHideMode;
}



