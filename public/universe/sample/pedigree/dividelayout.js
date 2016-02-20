/**
 * Created by Hyunwoo on 2016. 2. 19..
 */


var padding = {
    left: 50,
    top: 100,
    right: 50,
    bottom: 50,
}
var w = document.getElementById('renderer').offsetWidth;
var h = document.getElementById('renderer').offsetHeight;

var inner_w = 1500;//w - padding.left - padding.right;
var inner_h = 1500;//h - padding.top - padding.bottom;


// start and end : 1352 1539
var startYear = 1352;
var endYear = 1539;
var diffYear = endYear - startYear;
var MaxChildCount = data.totalCount;
var MaxPower = data.totalSize;
var map = {};
var nodeCount = 0;
var nodes = [];
var GapNodeEach = 3;

var gridmode = 'direct';
var displaymode = 'grade';
function gridMode(mode) {
    gridmode = mode;
    var funcmode = gridmode + displaymode;
    console.log(funcmode);
    nodes.forEach(function (e) {
        e[funcmode]();
        setMouseEvent(e);
    })
}
function displayMode(mode) {
    displaymode = mode;
    var funcmode = gridmode + displaymode;
    console.log(funcmode);
    nodes.forEach(function (e) {
        e[funcmode]();
        setMouseEvent(e);
    })
}

function devMode(mode){
    if(mode == 'on'){
        console.log(mode)
        nodes.forEach(function (e) {
            e.rect.attr('class','outer')
        })
    } else {
        nodes.forEach(function (e) {
            e.rect.attr('class','outer hidden')
        })
    }

}


var svg = d3.select("#renderer").append("svg");
svg.style('width', w);
svg.style('height', h);
svg.style('background', '#fff');

var parent_svg = svg.append('g').attr('fill', '#000000')
    .attr('transform', 'translate('
        + padding.left + ','
        + padding.top + ')'
    )

var drawerSvg = parent_svg;


var gridDirect = drawDirectGrid(drawerSvg);
var gridRadial = drawRadialGrid(drawerSvg);
gridDirect.style("pointer-events", "none").style('opacity',0);
gridRadial.style("pointer-events", "none").style('opacity',0);

var backwardSvg = drawerSvg.append('g').style("pointer-events", "none");
var forwardSvg = drawerSvg.append('g');
var postforwardSvg = drawerSvg.append('g').style("pointer-events", "none");
var tooltipSvg = drawerSvg.append('g').style("pointer-events", "none").attr('opacity',0);


tooltip();
function tooltip(){
    tooltipSvg.append('rect')
        .attr('x',0)
        .attr('y',0)
        .attr('rx',10)
        .attr('ry',10)
        .attr('width',200)
        .attr('height',135)
        .attr('class', 'tip').style("pointer-events", "none");

    var tip_name = tooltipSvg.append('text')
        .attr('x',100)
        .attr('y',20)
        .attr('text-anchor', 'middle')
        .text('권체 , 안동')
        .style("pointer-events", "none")
        .attr('class', 'tip_head')

    var tip_year = tooltipSvg.append('text')
        .attr('x',100)
        .attr('y',40)
        .attr('text-anchor', 'middle')
        .text('( 1416 - 1474 )') // birth death
        .style("pointer-events", "none")
        .attr('class', 'tip_body')

    var tip_depth = tooltipSvg.append('text')
        .attr('x',100)
        .attr('y',60)
        .attr('text-anchor', 'middle')
        .text('14세대 (남)') // depth sex
        .style("pointer-events", "none")
        .attr('class', 'tip_body')

    var tip_grade = tooltipSvg.append('text')
        .attr('x',100)
        .attr('y',95)
        .attr('text-anchor', 'middle')
        .text('관직 : 무과 영의정')// grade exam, title
        .style("pointer-events", "none")
        .attr('class', 'tip_body')

    var tip_power = tooltipSvg.append('text')
        .attr('x',100)
        .attr('y',118)
        .attr('text-anchor', 'middle')
        .text('영향력 : 11')
        .style("pointer-events", "none")
        .attr('class', 'tip_body')

    tooltip.show = function(data){
        tooltipSvg.transition().duration(200).attr('opacity',1);
        tip_name.text(data.name + " , " + data.family_origin);
        tip_year.text("( " + data.birth + " - " + data.death + " )");
        tip_depth.text(data.period + "세대 " + (data.sex =="1" ? "(여)" : "(남)"));
        tip_grade.text("관직 : " + data.grade_exam + " , " + data.title);
        tip_power.text("영향력 : " + data.size);
        //tooltipSvg.attr('transform', 'translate(500,100)')
    }
    tooltip.hide = function(){
        tooltipSvg.transition().duration(200).attr('opacity',0);
    }

}


drawerSvg.on('mousemove', function () {
    var x = d3.mouse(this)[0];
    var y = d3.mouse(this)[1];
    tooltipSvg.attr('transform', 'translate(' +
        x + ' , ' +
        y + ')');
});

function drawDirectGrid(svg) {
    gridDirect = svg.append('g').style("pointer-events", "none");
    var lineCount = Math.floor(diffYear);
    for (var i = 0; i < lineCount; i++) {
        var line = gridDirect.append('line');

        line.attr('x1', i / lineCount * inner_w)
            .attr('y1', 0)
            .attr('x2', i / lineCount * inner_w)
            .attr('y2', inner_h)
            .attr('class', 'grid')
            .style('opacity', 0.2).style("pointer-events", "none")


        if (i % 10 == 8) {
            var text = gridDirect.append('text');
            text.attr('x', i / lineCount * inner_w)
                .attr('y', -5)
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .text((1352 + i)).style("pointer-events", "none")

            line.attr('class', 'grid bold')
        }
    }
    gridDirect.style('opacity', 0)
    return gridDirect;
}
function drawRadialGrid(svg) {
    var gridRadial = svg.append('g').style("pointer-events", "none");
    var lineCount = Math.floor(diffYear);
    for (var i = 0; i < lineCount; i += 2) {
        var circle = gridRadial.append('circle');
        circle.attr('cx', inner_w / 2)
            .attr('cy', inner_h / 2)
            .attr('r', i / lineCount * inner_w / 2)
            .attr('class', 'grid').style("pointer-events", "none")

        if (i % 10 == 8) {
            var text = gridRadial.append('text');
            text.attr('x', inner_w / 2 - inner_w / 2 * i / lineCount)
                .attr('y', inner_h / 2)
                .attr('font-size', '10px')
                .attr('text-anchor', 'middle')
                .style('fill', '#8f8f8f')
                .text((1352 + i)).style("pointer-events", "none")
            circle.attr('class', 'grid bold')
        }
    }
    return gridRadial;
}

var lineData = [{"x": 1, "y": 5}, {"x": 20, "y": 20},
    {"x": 40, "y": 10}, {"x": 60, "y": 40},
    {"x": 80, "y": 5}, {"x": 100, "y": 60}];

var vertLineFunction = d3.svg.line()
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y - 1;
    })
    .interpolate("basis");

drawNodeInChild(data, null);

function drawNodeInChild(data, parent, idx) {
    drawNode(data, parent, idx);
    for (var i = 0; i < data.children.length; i++) {
        if (data.children[i] == null) continue;
        drawNodeInChild(data.children[i], data, i);
    }
}

function drawNode(data, parent, idx) {
    nodeCount++;
    var past = {
        pastChild: 0,
        pastPower: 0,
    };

    if (parent != null)
        past = getPrevStackedData(parent, idx);

    var coord = getPoints(data, parent, past);
    data.coord = coord;

    var each = appendNodeToParent(drawerSvg, coord, data)
    nodes.push(each);
}

function getPoints(data, parent, past) {
    var p_cy = 0;
    var p_py = 0;

    var pastChild = past.pastChild;
    var pastPower = past.pastPower;

    if (parent != null && parent.coord != null) p_cy = parent.coord.y_c;
    if (parent != null && parent.coord != null) p_py = parent.coord.y_p;


    var coord = { // current : rect
        x: (data.birth - startYear) / diffYear * inner_w,
        xe: (data.death - startYear) / diffYear * inner_w,
        y_c: pastChild / MaxChildCount * inner_h + p_cy,
        ye_c: (pastChild + data.totalCount) / MaxChildCount * inner_h + p_cy,
        y_p: pastPower / MaxPower * inner_h + p_py,
        ye_p: (pastPower + data.totalSize) / MaxPower * inner_h + p_py,
        parent_y_p: p_py,
        parent_y_c: p_cy,
        parent_x: 0,
        grid_connection_coord_p: [],
        grid_connection_coord_c: [],
        radial_connection_coord_p: [],
        radial_connection_coord_c: [],
        data: data,
    }

    // width
    coord.w = coord.xe - coord.x;

    // grid height
    coord.h_c = (data.totalCount) / MaxChildCount * inner_h;
    coord.h_p = (data.totalSize ) / MaxPower * inner_h;

    coord.y_p_center = (coord.y_p + coord.ye_p) / 2;
    coord.y_c_center = (coord.y_c + coord.ye_c) / 2;
    coord.angle_p = coord.y_p_center / inner_h;
    coord.angle_c = coord.y_c_center / inner_h;

    coord.r = coord.x / 2;
    coord.length = (coord.xe - coord.x) / 2;


    // node height
    coord.h_node_c = 1 / MaxChildCount * inner_h;
    coord.h_node_p = data.refineSize / MaxPower * inner_h;
    coord.radialposition = getRadialCoord(coord);

    if (parent != null)
        setConnectionCoord(coord, parent.coord)

    return coord;
}

function getRadialCoord(coord) {

    var PI2 = Math.PI * 2;
    var DefaultRotate = Math.PI / 2;
    var r_p = {
        x1: Math.cos(coord.angle_p * PI2 + DefaultRotate) * coord.r + inner_w / 2,
        y1: Math.sin(coord.angle_p * PI2 + DefaultRotate) * coord.r + inner_h / 2,
        x2: Math.cos(coord.angle_p * PI2 + DefaultRotate) * (coord.r + coord.length) + inner_w / 2,
        y2: Math.sin(coord.angle_p * PI2 + DefaultRotate) * (coord.r + coord.length) + inner_h / 2,
    }

    var r_c = {
        x1: Math.cos(coord.angle_c * PI2 + DefaultRotate) * coord.r + inner_w / 2,
        y1: Math.sin(coord.angle_c * PI2 + DefaultRotate) * coord.r + inner_h / 2,
        x2: Math.cos(coord.angle_c * PI2 + DefaultRotate) * (coord.r + coord.length) + inner_w / 2,
        y2: Math.sin(coord.angle_c * PI2 + DefaultRotate) * (coord.r + coord.length) + inner_h / 2,
    }
    var result = {
        r_p: r_p,
        r_c: r_c,
    }
    return result;

}

function onSelectSelection(svgs) {
    svgs.ele.attr('class', svgs.select_event_class)
    svgs.ele2.attr('class', svgs.select_event_class)
    svgs.node.attr('class', svgs.select_event_class)
    svgs.connection.attr('class', svgs.select_event_class + " nofill")
    tooltip.show(svgs.data);
}

function onReleaseSelection(svgs) {
    svgs.ele.attr('class', svgs.saved_class)
    svgs.ele2.attr('class', svgs.saved_class)
    svgs.node.attr('class', svgs.saved_class)
    svgs.connection.attr('class', svgs.saved_class + " nofill")
    tooltip.hide();

}

function setMouseEvent(svgs) {
    svgs.ele.on('mouseover', function () {onSelectSelection(svgs)})
    svgs.ele.on('mouseout', function () {onReleaseSelection(svgs)})
    svgs.ele2.on('mouseover', function () {onSelectSelection(svgs)})
    svgs.ele2.on('mouseout', function () {onReleaseSelection(svgs)})
    svgs.node.on('mouseover', function () {onSelectSelection(svgs)})
    svgs.node.on('mouseout', function () {onReleaseSelection(svgs)})
    svgs.connection.on('mouseover', function () {onSelectSelection(svgs)})
    svgs.connection.on('mouseout', function () {onReleaseSelection(svgs)})

}

function gridOnRadial() {
    gridRadial.transition().duration(1000).style('opacity', 1)
    gridDirect.transition().duration(1000).style('opacity', 0)
}
function gridOnDirect() {
    gridRadial.transition().duration(1000).style('opacity', 0)
    gridDirect.transition().duration(1000).style('opacity', 1)
}

function setConnectionCoord(coord, parentCoord) {
    coord.grid_connection_coord_p = [
        {
            x: parentCoord.x,
            y: parentCoord.y_p + parentCoord.h_node_p / 2,
        },
        {
            x: parentCoord.x + 50,
            y: parentCoord.y_p + parentCoord.h_node_p / 2,
        },
        {
            x: coord.x - 50,
            y: coord.y_p + coord.h_node_p / 2,
        },
        {
            x: coord.x,
            y: coord.y_p + coord.h_node_p / 2,
        },
    ]

    coord.grid_connection_coord_c = [
        {
            x: parentCoord.x,
            y: parentCoord.y_c + parentCoord.h_node_c / 2,
        },
        {
            x: parentCoord.x + 30,
            y: parentCoord.y_c + parentCoord.h_node_c / 2,
        },
        {
            x: coord.x - 20,
            y: coord.y_c + coord.h_node_c / 2,
        },
        {
            x: coord.x,
            y: coord.y_c + coord.h_node_c / 2,
        },
    ]


    function addVectorFromCenter(x, y, x2, y2, delta) {
        var vx = x2 - x;
        var vy = y2 - y;
        var length = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
        var dx = vx / length;
        var dy = vy / length;
        return {
            x: dx * delta + x,
            y: dy * delta + y,
        }
    }

    var pv2 = addVectorFromCenter(
        coord.radialposition.r_p.x1,
        coord.radialposition.r_p.y1,
        coord.radialposition.r_p.x2,
        coord.radialposition.r_p.y2,
        -20);

    var rv2 = addVectorFromCenter(
        parentCoord.radialposition.r_p.x1,
        parentCoord.radialposition.r_p.y1,
        parentCoord.radialposition.r_p.x2,
        parentCoord.radialposition.r_p.y2,
        20);

    coord.radial_connection_coord_p = [
        {
            x: coord.radialposition.r_p.x1,
            y: coord.radialposition.r_p.y1,
        },
        {

            x: pv2.x,
            y: pv2.y,
        },
        {
            x: rv2.x,
            y: rv2.y,
        },
        {
            x: parentCoord.radialposition.r_p.x1,
            y: parentCoord.radialposition.r_p.y1,
        },
    ]

    pv2 = addVectorFromCenter(
        coord.radialposition.r_c.x1,
        coord.radialposition.r_c.y1,
        coord.radialposition.r_c.x2,
        coord.radialposition.r_c.y2,
        -20);

    rv2 = addVectorFromCenter(
        parentCoord.radialposition.r_c.x1,
        parentCoord.radialposition.r_c.y1,
        parentCoord.radialposition.r_c.x2,
        parentCoord.radialposition.r_c.y2,
        20);

    coord.radial_connection_coord_c = [
        {
            x: coord.radialposition.r_c.x1,
            y: coord.radialposition.r_c.y1,
        },
        {

            x: pv2.x,
            y: pv2.y,
        },
        {
            x: rv2.x,
            y: rv2.y,
        },
        {
            x: parentCoord.radialposition.r_c.x1,
            y: parentCoord.radialposition.r_c.y1,
        },
    ]

}

function appendNodeToParent(svg, coord, data) {
    var svgs = {
        rect: {},
        lines: {},
        node: {},
        ele: {},
        ele2: {},
        connection: {},
        text: {},
        tip: {},
        coord: coord,
        data : data,
        grade: function () {
        },
        person: function () {
        },
    }

    svgs.rect = drawerSvg.append('rect')
        .attr('x', coord.x)
        .attr('y', coord.y_p)
        .attr('width', coord.w)
        .attr('height', coord.h_p)
        .attr('class', 'outer hidden')


    svgs.connection = backwardSvg.append('path')
        .attr('d', vertLineFunction(coord.grid_connection_coord_p))


    svgs.ele = forwardSvg.append('circle').attr('r', 2).style('opacity', 1.0);
    svgs.ele2 = forwardSvg.append('circle').attr('r', 2).style('opacity', 1.0);
    svgs.node = forwardSvg.append('line');
    svgs.text = postforwardSvg.append('g').style("pointer-events", "none")
    svgs.text
        .append('text')
        .text(coord.data.name)
        .attr('class', 'text name')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('x', 0)
        .attr('y', 0).style("pointer-events", "none")


    svgs.tip = forwardSvg.append('g')



    if (coord.data.line == '1') {
        svgs.saved_class = 'node line1';
        svgs.select_event_class = 'node line1 selection';
        svgs.ele.attr('class', 'node line1')
        svgs.ele2.attr('class', 'node line1')
        svgs.node.attr('class', 'node line1')
        svgs.connection.attr('class', 'connection line1')

    } else {
        svgs.saved_class = 'node line2';
        svgs.select_event_class = 'node line2 selection';
        svgs.ele.attr('class', 'node line2')
        svgs.ele2.attr('class', 'node line2')
        svgs.node.attr('class', 'node line2')
        svgs.connection.attr('class', 'connection line2')
    }

    setMouseEvent(svgs);

    function getTransition(ele) {
        return ele.transition().duration(850);
    }

    //setRadialAttrPower(svgs.ele, svgs.ele2, svgs.node, svgs.connection , coord)
    setDirectAttrPower(svgs.ele, svgs.ele2, svgs.node, svgs.connection, svgs.text, svgs.tip, coord)
    svgs.directgrade = function () {
        this.rect.transition()
            .attr('x', coord.x)
            .attr('y', coord.y_p)
            .attr('width', coord.w)
            .attr('height', coord.h_p)

        setDirectAttrPower(getTransition(this.ele),
            getTransition(this.ele2),
            getTransition(this.node),
            getTransition(this.connection),
            getTransition(this.text),
            getTransition(this.tip),
            coord)
    }

    svgs.directperson = function () {
        this.rect.transition()
            .attr('x', coord.x)
            .attr('y', coord.y_c)
            .attr('width', coord.w)
            .attr('height', coord.h_c)

        setDirectAttrPerson(getTransition(this.ele),
            getTransition(this.ele2),
            getTransition(this.node),
            getTransition(this.connection),
            getTransition(this.text),
            getTransition(this.tip),
            coord)
    }

    svgs.radialgrade = function () {
        this.rect.attr('class', 'outer hidden')
        setRadialAttrPower(getTransition(this.ele),
            getTransition(this.ele2),
            getTransition(this.node),
            getTransition(this.connection),
            getTransition(this.text),
            getTransition(this.tip),
            coord)
    }

    svgs.radialperson = function () {
        this.rect.attr('class', 'outer hidden')
        setRadialAttrPerson(getTransition(this.ele),
            getTransition(this.ele2),
            getTransition(this.node),
            getTransition(this.connection),
            getTransition(this.text),
            getTransition(this.tip),
            coord)
    }
    return svgs;

}

function setRadialAttrPerson(ele, ele2, line, connection, text, tip, coord) {
    gridOnRadial();

    var radius = Math.max(coord.h_node_c / 4 - 1, 3);

    ele.attr('cx', coord.radialposition.r_c.x1)
        .attr('cy', coord.radialposition.r_c.y1)
        .attr('r', radius)

    ele2.attr('cx', coord.radialposition.r_c.x2)
        .attr('cy', coord.radialposition.r_c.y2)
        .attr('r', radius)

    line.attr('x1', coord.radialposition.r_c.x1)
        .attr('y1', coord.radialposition.r_c.y1)
        .attr('x2', coord.radialposition.r_c.x2)
        .attr('y2', coord.radialposition.r_c.y2)
        .style('stroke-width', radius)

    text.attr('transform', 'translate(' +
        coord.radialposition.r_c.x1 + ',' +
        coord.radialposition.r_c.y1 + ')');

    var angleDeg = Math.atan2(
            coord.radialposition.r_c.x1 - inner_w / 2,
            coord.radialposition.r_c.y1 - inner_h / 2)
        * 180 / Math.PI + 90;
    if (angleDeg > 90 && angleDeg < 270) angleDeg = angleDeg + 180;

    var text_x = (coord.radialposition.r_c.x1 + coord.radialposition.r_c.x1) / 2;
    var text_y = (coord.radialposition.r_c.y1 + coord.radialposition.r_c.y1) / 2;
    text.attr('transform', 'translate(' +
            text_x + ',' +
            text_y + '), ' +
            'rotate(' + -angleDeg + ')')
        .style('opacity', 1);

    connection.attr('d', vertLineFunction(coord.radial_connection_coord_c)).attr('opacity', radius)

}
function setRadialAttrPower(ele, ele2, line, connection, text, tip, coord) {
    gridOnRadial();
    var radius = Math.max(coord.h_node_p / 2 - 1, 0.5);

    ele.attr('cx', coord.radialposition.r_p.x1)
        .attr('cy', coord.radialposition.r_p.y1)
        .attr('r', radius)

    ele2.attr('cx', coord.radialposition.r_p.x2)
        .attr('cy', coord.radialposition.r_p.y2)
        .attr('r', radius)

    line.attr('x1', coord.radialposition.r_p.x1)
        .attr('y1', coord.radialposition.r_p.y1)
        .attr('x2', coord.radialposition.r_p.x2)
        .attr('y2', coord.radialposition.r_p.y2)
        .style('stroke-width', radius)


    var text_x = (coord.radialposition.r_p.x1 + coord.radialposition.r_p.x1) / 2;
    var text_y = (coord.radialposition.r_p.y1 + coord.radialposition.r_p.y1) / 2;

    var angleDeg = Math.atan2(
            text_x - inner_w / 2,
            text_y - inner_h / 2)
        * 180 / Math.PI + 90;
    if (angleDeg > 90 && angleDeg < 270) angleDeg = angleDeg + 180;

    text.attr('transform', 'translate(' +
            text_x + ',' +
            text_y + ')' +
            'rotate(' + -angleDeg + ')')
        .style('opacity', radius < 0.8 ? 0 : radius);


    connection.attr('d', vertLineFunction(coord.radial_connection_coord_p))
        .attr('opacity', radius)
}
function setDirectAttrPerson(ele, ele2, line, connection, text, tip, coord) {
    gridOnDirect();
    var radius = Math.max(coord.h_node_c / 2 - 1, 6);
    gridDirect.transition().style('opacity', 1)
    ele.attr('cx', coord.x + radius)
        .attr('cy', coord.y_c + radius)
        .attr('r', radius)

    ele2.attr('cx', coord.x + coord.w - radius)
        .attr('cy', coord.y_c + radius)
        .attr('r', radius)

    line.attr('x1', coord.x + radius)
        .attr('y1', coord.y_c + radius)
        .attr('x2', coord.x + coord.w - radius)
        .attr('y2', coord.y_c + radius)
        .style('stroke-width', radius)

    var text_x = coord.x + radius + 3;
    var text_y = coord.y_c + radius;
    text.attr('transform', 'translate(' +
            text_x + ',' +
            text_y + ')')
        .style('opacity', .8)
        .style('font-size', radius);

    connection.attr('d', vertLineFunction(coord.grid_connection_coord_c)).attr('opacity', radius)
}
function setDirectAttrPower(ele, ele2, line, connection, text, tip, coord) {
    gridOnDirect();
    var radius = Math.max(coord.h_node_p / 2 - 3, 0.3);
    var opacity = radius;
    if (opacity > 1) opacity = 1;

    ele.attr('cx', coord.x + radius)
        .attr('cy', coord.y_p + radius)
        .attr('r', radius + opacity)

    ele2.attr('cx', coord.x + coord.w - radius)
        .attr('cy', coord.y_p + radius)
        .attr('r', radius + opacity)

    line.attr('x1', coord.x + radius)
        .attr('y1', coord.y_p + radius)
        .attr('x2', coord.x + coord.w - radius)
        .attr('y2', coord.y_p + radius)
        .style('stroke-width', radius)

    var text_x = coord.x + coord.w / 2;// coord.w/2 ;
    var text_y = coord.y_p + radius;
    text.attr('transform', 'translate(' +
            text_x + ',' +
            text_y + ')')
        .style('opacity', opacity < 0.5 ? 0 : opacity)
        .style('font-size', radius * 0.7)

    connection.attr('d', vertLineFunction(coord.grid_connection_coord_p)).attr('opacity', opacity)
}

function getPrevStackedData(parent, idx) {
    var pastChild = 0
    var pastPower = 0;
    if (parent.children == null) {
        return {
            pastChild: pastChild,
            pastPower: pastPower,
        };
    }

    pastChild = parent.totalCount - parent.childCount;
    pastPower = parent.refineSize;

    for (var i = 0; i < idx; i++) {
        if (parent.children[i] != null) {
            pastChild += parent.children[i].totalCount;
            pastPower += parent.children[i].totalSize;
        }
    }

    return {
        pastChild: pastChild,
        pastPower: pastPower,
    };

}

function updateNodeOption() {

}

