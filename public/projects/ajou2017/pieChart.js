/**
 * Created by suhyun on 2017. 1. 18..
 */



function drawPieChart(data, question) {
    var w;
    var h;
    var g;

    $('#config').empty();
    $('.question').removeClass('cloudAndBar');

    $('.network-bg').removeClass('open');
    $('.graph-bg').addClass('open');


    $('svg').remove();


    var svg = d3.select(".graph-bg").append("svg").attr("class", 'fulid-svg');

    w = svg.style('width').replace('px', '') * 1;
    h = svg.style('height').replace('px', '') * 1 - 250;
    g = svg.append('g').attr('transform', 'translate(' + w / 2 + ' , ' + h / 2 + ')');


    var color = ['#354252', '#F07774', '#524642', '#6da9b5', '#fcb129', '#54728b', '#EAC2B2','#8f8d92']

    //['#504C64', '#F07774', '#93A8A7', '#24AE94'];

    var keys = [];
    var values = [];
    var sum = 0;
    var startAng = 0;
    _.map(data, function (d, i) {
        sum += Number(d.value);
    });

    _.map(data, function (d, i) {
        keys.push(d.key);
        values.push(Number(d.value));

        var startRatio = startAng / sum + 0.01;
        var endRatio = (Number(startAng) + Number(d.value)) / sum - 0.01;

        drawArc(g, 265, 300, startRatio, endRatio, color[i % color.length]);
        startAng += Number(d.value);
        drawLineFromRatio(g, startRatio, 265, 355, d.key, Math.floor(d.value / sum * 100), color[i % color.length]);
    });

    // Question
    $('.question').html(question.key);
    $('.story-telling').html(question.value)
}


function drawLineFromRatio(section, ratio, rad1, rad2, key, value, color) {
    var angle = ratio * Math.PI * 2 - 90 / 180 * Math.PI;
    drawLine(section, Math.cos(angle) * rad1, Math.sin(angle) * rad1
        , Math.cos(angle) * rad2, Math.sin(angle) * rad2, color, 3);

    if (Math.cos(angle) * rad2 > 30) {
        drawLine(section, Math.cos(angle) * rad2, Math.sin(angle) * rad2
            , Math.cos(angle) * rad2 + 20, Math.sin(angle) * rad2, color, 3);
        //퍼센트
        writeText(section, Math.cos(angle) * rad2 + 30, Math.sin(angle) * rad2 - 35, value + '%', color).attr('text-anchor', 'start').attr('font-size', 20);
        // 글자
        writeText(section, Math.cos(angle) * rad2 + 30, Math.sin(angle) * rad2, key, color).attr('text-anchor', 'start').attr('font-size', 30);
    } else if (-30 < Math.cos(angle) * rad2 && Math.cos(angle) * rad2 < 30) {
        if (0 < Math.sin(angle)) {
            writeText(section, Math.cos(angle) * rad2, Math.sin(angle) * rad2 + 20, value + '%', color).attr('font-size', 20);
            writeText(section, Math.cos(angle) * rad2, Math.sin(angle) * rad2 + 55, key, color).attr('font-size', 30);
        } else {
            writeText(section, Math.cos(angle) * rad2, Math.sin(angle) * rad2 - 50, value + '%', color).attr('font-size', 20);
            writeText(section, Math.cos(angle) * rad2, Math.sin(angle) * rad2 - 20, key, color)
                .attr('font-size', 30);
        }
    } else {
        drawLine(section, Math.cos(angle) * rad2, Math.sin(angle) * rad2
            , Math.cos(angle) * rad2 - 20, Math.sin(angle) * rad2, color, 3)
        writeText(section, Math.cos(angle) * rad2 - 30, Math.sin(angle) * rad2 - 35, value + '%', color).attr('text-anchor', 'end').attr('font-size', 20);
        writeText(section, Math.cos(angle) * rad2 - 30, Math.sin(angle) * rad2, key, color).attr('text-anchor', 'end')
            .attr('font-size', 30);
    }

}

function drawArc(section, innerRad, outerRad, startAng, endAng, fill) {
    var arc = d3.svg.arc()
        .innerRadius(innerRad)
        .outerRadius(outerRad)
        .startAngle(startAng * Math.PI * 2); //convert from degs to radians

    var foreground = section.append("path")
        .datum({endAngle: endAng * Math.PI * 2})
        .style("fill", fill)
        .attr("d", arc);
}

function writeText(section, x, y, text, color) {
    return section.append('text').attr('x', x).attr('y', y).text(text).attr('class', 'pieGraphRatio').attr('alignment-baseline', 'middle').attr('fill', color)
        .attr('fonts-weight', 'bold').attr('text-anchor', 'middle');
}

function drawLine(section, x1, y1, x2, y2, stroke, strokeWidth) {
    return section.append('line').attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).attr('stroke', stroke).attr('stroke-width', strokeWidth);
}






























