/**
 * Created by Luan on 2015. 11. 19..
 */

var svg;
function render(data) {
    if(svg != null) svg.remove();
    var diameter = document.getElementById('renderer').offsetHeight,
        width = document.getElementById('renderer').offsetWidth,
        margin = 100,
        radius = diameter / 2 - margin,
        innerRadius = radius - 120;

    var cluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(null)
        .value(function (d) {
            return d.size;
        });


    var zoom = d3.behavior.zoom()
        .scaleExtent([0.1, 10])
        //.on("zoomend", zoomed)
        //.on("zoomstart", zoomed)
        .on("zoom", zoomed);

    var bundle = d3.layout.bundle();

    var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(.65)
        .radius(function (d) {
            return d.y;
        })
        .angle(function (d) {
            return d.x / 180 * Math.PI;
        });

    svg = d3.select("#renderer").append("svg")
        .attr("width", width)
        .attr("height", diameter)
        .attr("transform", "translate(" + width / 2 + "," + (radius + margin) + ")")
        .call(zoom)
    var container = svg.append("g");


    var nodes = cluster.nodes(packageHierarchy(data)),
        links = packageImports(nodes);

    console.log(links);

    var link = container.append("g").selectAll(".link"),
        node = container.append("g").selectAll(".node");
    link = link
        .data(bundle(links))
        .enter().append("path")
        .each(function (d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "link")
        .attr("d", line);

    node = node
        .data(nodes.filter(function (n) {
            return !n.children;
        }))
        .enter().append("text")
        .attr("class", "node")
        .attr("dy", ".31em")
        .attr("transform", function (d) {
            return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)");
        })
        .style("text-anchor", function (d) {
            return d.x < 180 ? "start" : "end";
        })
        .text(function (d) {
            return d.key;
        })
        .on("mouseover", mouseovered)
        .on("mouseout", mouseouted)
        .on("click", mouseclicked);

    d3.select(self.frameElement).style("height", diameter + "px");


    function mouseovered(d) {

        node
            .each(function(n) { n.target = n.source = false; });

        link
            .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
            .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
            .filter(function(l) { return l.target === d || l.source === d; })

        node
            .classed("node--target", function(n) { return n.target; })
            .classed("node--source", function(n) { return n.source; });
    }

    function mouseclicked(d) {
        console.log("clicked");

        node
            .each(function(n) { n.target = n.source = false; });

        link
            .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
            .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
            .filter(function(l) { return l.target === d || l.source === d; })
            .each(function() { this.parentNode.appendChild(this); });

        node
            .classed("node--target", function(n) { return n.target; })
            .classed("node--source", function(n) { return n.source; });
    }

    function mouseouted(d) {
        link
            .classed("link--target", false)
            .classed("link--source", false);

        node
            .classed("node--target", false)
            .classed("node--source", false);
    }


    function zoomed() {
        container.attr("transform", "translate(" + (d3.event.translate[0] ) + " , " + (d3.event.translate[1] ) + ")scale(" + d3.event.scale + ")");
    }

// Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
        var map = {};

        function find(name, data) {
            var node = map[name], i;
            if (!node) {
                node = map[name] = data || {name: name, children: []};
                if (name.length) {
                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                    node.parent.children.push(node);
                    node.key = name.substring(i + 1);
                }
            }
            return node;
        }

        classes.forEach(function (d) {
            find(d.convert_name, d);
        });

        return map[""];
    }

// Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
        var map = {},
            imports = [];

        // Compute a map from name to node.
        nodes.forEach(function (d) {
            map[d.name] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function (d) {
            if (d.imports) d.imports.forEach(function (i) {
                imports.push({source: map[d.name], target: map[i]});
            });
        });

        return imports;
    }
}
