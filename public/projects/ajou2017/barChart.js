/**
 * Created by suhyun on 2017. 1. 19..
 */


function drawBarChart(data,question) {
    var w;
    var h;
    var g;
    var margin = 200;
    var textMargin = margin - 50;
    var barWidth = 50;
    var hGridGap = 100;
    var percentText = 15;

    $('svg').remove();

    // Question
    $('.question').addClass('cloudAndBar');
    $('.question').html(question.key);
    $('.story-telling').html(question.value);

    var color = [
        '#eeb700',
        '#7C745E',
        '#D3C9BF',
        '#6fc0ce',
        '#d48b79'];
    var svg = d3.select(".graph-bg").append("svg").attr("class", 'fulid-svg');
    w = svg.style('width').replace('px', '') * 1;
    h = svg.style('height').replace('px', '') * 1 - margin;

    var keys = [];
    var values = [];
    var sum = 0;
    _.each(data, function (d) {
        sum += d.value * 1;
    });


    _.map(data, function (d, i) {
        keys.push(d.key);
        values.push(Number(d.value));
    });


    var max = _.max(values, function (d, i) {
        return d;
    });

    max = max * 1;
    max = max - max % (hGridGap / h * max) + (hGridGap / h * max);

    var graphH = h - margin * 2;
    var hGridNum = graphH / hGridGap;

    for (var i = 0; i < keys.length; i++) {
        var gap = (w - margin * 2) / (keys.length + 1);
        var gridX = margin + gap * (i + 1);
        var graphValue = values[i] / max * graphH;
        var percentTextPosition = h - (margin + graphValue) - percentText;
        //drawLine(svg, gridX, margin, gridX, h - margin, '#ddd', 1);
        drawRect(svg, gridX - barWidth / 2, h - (margin + graphValue), barWidth, graphValue).attr('fill', color[i % color.length]);
        // 퍼센트
        writeText(svg, gridX, percentTextPosition, Math.floor(values[i] * 100 / sum) + '%').attr('class', 'axis-text').attr('fill', color[i % color.length]);
        writeText(svg, gridX, h - textMargin, keys[i]).attr('class', 'axis-text');

    }

    for (var i = 0; i < hGridNum; i++) {
        var gridY = h - margin - (hGridGap * i);
        drawLine(svg, margin, gridY, w - margin, gridY, '#ddd', 1);

        // 세로 그리드 숫자
        writeText(svg, textMargin, gridY, Math.floor(max / hGridNum * i)).attr('class', 'axis-text');
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
    return section.append('rect').attr('x', x).attr('y', y).attr('width', width).attr('height', height).attr('class', 'bar-chart');
}