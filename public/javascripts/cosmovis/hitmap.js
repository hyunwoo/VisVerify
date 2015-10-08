/**
 * Created by hyunwoo on 2015-07-31.
 */
var loadedData = semanticWordsOrigin;

var rects = new Array();
var x_ratio = 0;
var y_ratio = 0;
var rect_size = 3;
var affect_power = 20;
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


    var output = [];
    for (var i = 0; i < loadedData.length; i++) {

        var x = Math.floor(loadedData[i][1] * x_ratio / rect_size);
        var y = Math.floor(loadedData[i][2] * y_ratio / rect_size);

        output.push({
            name : "affect",
            value : affect_power,
        })
        affect(x, y, loadedData[i][3] * affect_power);
    }




    var colors = ['#ffffff','#465aa6','#5780be','#77baf1','#75b7e4',
        '#89c5db','#c9d871','#ccc738','#c87c21','#cd4c31','#8b2e22',
        '#89211a', '#89211a','#89211a','#89211a','#89211a','#89211a'];
    var domainval = [];
    for(var i = 0 ; i < colors.length; i ++) {
        var val = max * i / colors.length;
        domainval.push(val);
    }

    var color = d3.scale.linear()
        .domain(domainval)
        .range(colors);
    if(status){
        for (var i = 0; i < cx; i++) {
            for (var j = 0; j < cy; j++) {
                var val = rects[i][j].value;
                if (val > 0) {
                    //var idx = Math.floor(val * colors.length/max);
                    //var c = color(val);
                    var val = Math.floor(val * colors.length / max);
                    if(val >= colors.length)
                        val = colors.length - 1;
                    var c = colors[val];
                    rects[i][j].rect.transition().duration(500).attr('fill', c);
                } else {
                    rects[i][j].rect.attr('fill', '#ffffff');
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
            rects[i][j].rect.transition().duration(500).attr('fill', '#ffffff');
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
            'font-size': '9px',
        }).text(loadedData[i][0]);
    }
    for (var i = 0; i < rects.length; i++) {
        for (var j = 0; j < rects[i].length; j++) {
            rects[i][j].rect = layer_rect.append('rect').attr({
                x: rects[i][j].x,
                y: rects[i][j].y,
                width: rect_size + 1,
                height: rect_size + 1,

                fill: '#ffffff',

            })
        }
    }

}
