/**
 * Created by hyunwoo on 2015-07-31.
 */
//첫번째
//"rgb(0,25,255)"를 rgb(255,255,255)로 수정하면 흰바탕이 됩니다.
var colorLevel = ["rgb(255,255,255)", "rgb(0,48,254)", "rgb(5,130,255)", "rgb(1,190,254)", "rgb(5,201,255)", "rgb(19,253,242)", "rgb(122,255,142)", "rgb(200,255,112)", "rgb(255,255,0)", "rgb(255,79,0)", "rgb(240,0,1)", "rgb(160,0,1)", "rgb(125,0,4)"];
//배경rgb
var loadedData = [
    /* happy */
    ["sweet", 1007, 383, 0],
    ["excited", 895, 232, 0],
    ["enjoyable", 994, 121, 0],
    ["funny", 807, 281, 0],
    ["pleasant", 1010, 239, 80],
    ["gratified", 770, 139, 0],
    ["happy", 923, 328, 0],
    ["energetic", 868, 62, 0],
    ["fantastic", 853, 158, 0],
    ["impressed", 874, 546, 0],
    ["touched", 816, 494, 0],
    ["wonderful", 860, 440, 0],
    ["awesome", 755, 420, 0],
    ["surprised", 696, 224, 0],
    ["great", 927, 481, 0],
    ["ecstatic", 780, 367, 0],
    ["calm", 717, 560, 0],
    ["drowsy", 769, 585, 0],
    ["bored", 675, 595, 0],
    ["heartbroken", 374, 511, 0],
    ["mournful", 490, 608, 0],
    ["sad", 418, 560, 0],
    ["lonely", 565, 590, 0],
    ["pitiful", 523, 561, 0],
    ["unfortunated", 261, 470, 0],
    ["furious", 190, 388, 0],
    ["outraged", 112, 353, 0],
    ["disgusted", 278, 221, 0],
    ["omnious", 231, 271, 0],
    ["cruel", 304, 283, 0],
    ["terrified", 403, 150, 0],
    ["chilly", 502, 104, 0],
    ["scared", 424, 77, 0],
    ["fearsome", 459, 208, 0],
    ["horrifyied", 600, 126, 0],
    ["creepy", 535, 166, 0]
];


var rects = new Array();
var x_ratio = 0;
var y_ratio = 0;
var rect_size = 5;
var cx;
var cy;
var max = 0;
var layer_rect;
var layer_text;

var affect_count = 0;

function drawHeatmap(datas, status) {
    max = 0;


    if(!status)layer_text.attr('opacity',0);
    else layer_text.attr('opacity',1);
    var maxVal = 0;
    var maxIdx = 0;
    for (var i = 0; i < loadedData.length; i++) {

        if (datas[i] == null || datas[i] == undefined) {
            loadedData[i][3] = 0;
        }
        if (maxVal < datas[i]) {
            maxVal = datas[i];
            maxIdx = i;
        }
        loadedData[i][3] = datas[i];
        if (isNaN(loadedData[i][3])) loadedData[i][3] = 0;
    }

    var temp = [];
    var totalval = 0;
    for (var i = 0; i < loadedData.length; i++) {
        temp.push({
            idx: i,
            val: loadedData[i][3],
        });
        totalval += loadedData[i][3];
    }



    for (var i = 0; i < temp.length; i++) {
        for (var j = i + 1; j < temp.length; j++) {

            if (temp[i].val < temp[j].val) {
                var t = {
                    idx: temp[i].idx,
                    val: temp[i].val,
                }

                temp[i].val = temp[j].val;
                temp[i].idx = temp[j].idx;

                temp[j].val = t.val;
                temp[j].idx = t.idx;
            }

        }
    }

    var result = '';
    for (var i = 0; i < 3; i++) {
        result += (i + 1) + ' : ' + loadedData[temp[i].idx][0] + ' (' + Math.floor(loadedData[temp[i].idx][3] / totalval * 100) + '%)' ;
        if(i != 2) result += ' , ';
    }



    if (maxVal != 0) {
        for (var i = 0; i < loadedData.length; i++) {
            loadedData[i][3] = (loadedData[i][3] * 1) / maxVal;
        }
    }


    for (var i = 0; i < loadedData.length; i++) {

        var x = Math.floor(loadedData[i][1] * x_ratio / rect_size);
        var y = Math.floor(loadedData[i][2] * y_ratio / rect_size);


        affect(x, y, loadedData[i][3] * 8);

    }


    var color = d3.scale.linear()
        .domain([0, max / 3, max / 3 * 2, max])
        .range(['blue', 'green', 'yellow', 'red']);

    if(status){
        for (var i = 0; i < cx; i++) {
            for (var j = 0; j < cy; j++) {
                var val = rects[i][j].value;
                var c = color(rects[i][j].value);
                if (val > 0) {
                    rects[i][j].rect.transition().duration(500).attr('fill', c);
                } else {
                    //rects[i][j].rect.attr('fill', '#ffffff');
                }

            }

        }
    } else {
        for (var i = 0; i < cx; i++) {
            for (var j = 0; j < cy; j++) {
                rects[i][j].rect.transition().duration(500).attr('fill', '#ffffff');
            }

        }
    }



    return result;

}


function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y2 - y1) * (y2 - y1));
}
function affect(x, y, power) {
    power = Math.floor(power);
    if (power < 1) return;
    if (x < 0 || y < 0 || x >= cx || y >= cy) return;

    var minx = 0;
    if (x - power > 0) minx = x - power;
    var maxx = minx + power * 2;
    if (maxx > cx - 1) maxx = cx - 1;

    var miny = 0;
    if (y - power > 0) miny = y - power;
    var maxy = miny + power * 2;

    if (maxy > cy - 1) maxy = cy - 1;

    for (var i = minx; i < maxx; i++) {
        for (var j = miny; j < maxy; j++) {
            var p = Math.floor(dist(x, y, i, j));

            if (p > power) continue;
            else p = power - p;

            rects[i][j].value += p;
            affect_count++;
        }
    }
    if (max < rects[x][y].value) max = rects[x][y].value;


}
function clearHeatmap() {
    for (var i = 0; i < cx; i++) {
        for (var j = 0; j < cy; j++) {
            rects[i][j].value = 0;
            rects[i][j].rect.transition().duration(500).attr('fill', '#dddddd');
        }
    }
}
function initHeatmap(svg, x, y, w, h) {
    cx = w / rect_size;
    cy = h / rect_size;
    rects = new Array();
    x_ratio = w / 1200;
    y_ratio = h / 700;

    for (var i = 0; i < cx; i++) {
        var rect = [];
        for (var j = 0; j < cy; j++) {
            rect.push({
                value: 0,
                x: i * rect_size + x * 1,
                y: j * rect_size + y * 1,
                rect: {},
            });
        }
        rects.push(rect);
    }

    layer_rect = svg.append('g');
    layer_text = svg.append('g');


    for (var i = 0; i < loadedData.length; i++) {

        var tx = (loadedData[i][1] * 1) * (x_ratio * 1) + x;
        var ty = (loadedData[i][2] * 1) * (x_ratio * 1) + y + 5 * 1;

        layer_text.append('text').attr({
            x: tx,
            y: ty,
            fill: '#111111',
            'text-anchor': 'middle',


        }).style({
            'font-size': '10px',
        }).text(loadedData[i][0]);
    }
    for (var i = 0; i < rects.length; i++) {
        for (var j = 0; j < rects[i].length; j++) {
            rects[i][j].rect = layer_rect.append('rect').attr({
                x: rects[i][j].x,
                y: rects[i][j].y,
                width: rect_size - 1,
                height: rect_size - 1,

                fill: '#dddddd',

            })
        }
    }

}
