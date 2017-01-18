/**
 * Created by suhyun on 2017. 1. 19..
 */
var w;
var h;
var g;
var margin = 200;
var textMargin = margin-50;
var barWidth = 30;
var hGridGap = 100;
$(function () {
    var data = [
        {key: '기계공학', value: '80'},
        {key: '미디어', value: '10'},
        {key: '심리학과', value: '90'},
        {key: '심리학과', value: '30'},
        {key: '심리학과', value: '40'},
        {key: '심리학과', value: '50'},
        {key: '심리학과', value: '30'}
    ];

    drawBarChart(data);
});

function drawBarChart(data) {
    var color = ['#F1C200', '#7C745E', '#D3C9BF', '#7ACEEE', '#F76970'];
    var svg = d3.select(".graph-bg").append("svg").attr("class", 'fulid-svg');
    w = svg.style('width').replace('px', '') * 1;
    h = svg.style('height').replace('px', '') * 1 - margin;

    var keys = [];
    var values = [];
    _.map(data, function (d, i) {
        keys.push(d.key);
        values.push(Number(d.value));
    });

    var max = _.max(values, function(d,i){
        return d;
    });

    max = max*1;
    max = max

    var graphH = h-margin*2;
    var hGridNum = graphH / hGridGap;

    for (var i = 0; i < keys.length; i++) {
        var gap = (w - margin * 2) / (keys.length + 1);
        var gridX = margin + gap * (i + 1);

        var graphValue = values[i]/max *graphH;
        //drawLine(svg, gridX, margin, gridX, h - margin, '#ddd', 1);
        drawRect(svg, gridX - barWidth / 2, h - (margin + graphValue), barWidth, graphValue).attr('fill', color[i % color.length]);
        writeText(svg, gridX, h - textMargin, keys[i]).attr('class', 'axis-text');

    }

    for(var i = 0 ; i < hGridNum ; i++){
        var gridY =  h-margin - (hGridGap*i);
        drawLine(svg, margin, gridY, w - margin,gridY, '#ddd', 1);
        writeText(svg, textMargin, gridY, graphH / hGridGap * i).attr('class', 'axis-text');
    }


    drawLine(svg, margin, h - margin, w - margin, h - margin, '#aaa', 1);
    drawLine(svg, margin, h - margin, margin, margin, '#aaa', 1);

}

function writeText(section, x, y, text, color) {
    return section.append('text').attr('x', x).attr('y', y).text(text).attr('class', 'pieGraphRatio').attr('alignment-baseline', 'middle').attr('fill', color)
        .attr('fonts-weight', 'bold').attr('text-anchor', 'middle');
}

function drawLine(section, x1, y1, x2, y2, stroke, strokeWidth) {
    return section.append('line').attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).attr('stroke', stroke).attr('stroke-width', strokeWidth);
}

function drawRect(section, x, y, width, height) {
    return section.append('rect').attr('x', x).attr('y', y).attr('width', width).attr('height', height).attr('calss', 'bar-chart');
}