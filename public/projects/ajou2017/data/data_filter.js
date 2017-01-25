/**
 * Created by hyunwoo on 2017-01-18.
 */
$(function () {

    var t = enter_data;
    var qlist = t[1];
    _.each(qlist, function (q, i) {
        if (!_.isNil(q)) $('<option q_code="q' + i + '">' + q + '</option>').appendTo('#selectorQuestion');
    })

    t = _.drop(t, 2);
    var filterParent = $('#filter');
    var filterItem = $('#itemOrigin');
    var checkItem = $('#checkBoxItem');

    var origin_data = _.map(t, function (d) {
        return _.map(d, function (e, i) {
            return {
                q: 'q' + i,
                q_total: qlist[i],
                a: e,
                a_cat: [],
            }
        });
    });
    var filtered = filterData();
    var answer = filtered.ans;

    var keys = Object.keys(answer);
    var keyIdx = Math.ceil(keys.length / 2);
    for (var i = 1; i < keyIdx; i++) {
        var opts = _.sortBy(answer['q' + i + '_summary'], function (o) {
            return -o.value;
        });

        if (opts.length < 500) {
            var t = _.take(opts, 10);
            createFilter(qlist[i], t, 'q' + i);
        }
    }

    filterItem.addClass('initItem');
    checkItem.addClass('initItem');


    function createFilter(name, options, q) {
        var item = filterItem.clone();
        item.find('.name').html(q + ' ' + name);
        item.appendTo('#filters');


        _.map(options, function (d, i) {
            var opt = checkItem.clone().appendTo(item);
            var check = opt.find('input');
            check.attr('id', q + i);
            check.attr('cat', d.key);
            check.attr('q_name', name);
            check.attr('q_code', q);
            var label = opt.find('label');
            label.attr('for', q + i);
            label.html(d.key + '(' + d.value + ')');
        });

    }


    $('#actionClick').click(clickAction);

    function clickAction() {
        makeFilterOption();

        var selectQ = $('#selectorQuestion option:selected').attr('q_code') + '_summary';
        var selectMessage = $('#selectorQuestion option:selected').text();
        var selectVis = $('#selectorVisMode option:selected').text();

        //console.log('select q : ' + selectQ + ' , select vis : ' + selectVis);
        var opts = makeFilterOption();
        var d = filterData(opts, false);

        var throughtData = d.ans[selectQ];
        throughtData = _.sortBy(throughtData, function (d) {
            return -d.value;
        });

        var a = {key: 'Q. ' + selectMessage, 'value': '신입생 여러분들이 대학생이 되면 가장 하고싶은건 바로 연애군요.'};

        var color = colorPicker(selectQ, selectVis);
        console.log('color', color)

        switch (selectVis) {
            case "BarGraph":
                throughtData = _.take(throughtData, 8);
                var max = _.max(throughtData, function (d) {
                    return d.value;
                }).value;
                throughtData = _.filter(throughtData, function (d) {
                    return d.value > max * 0.05;
                });
                console.log(throughtData.length, throughtData);

                drawBarChart(throughtData, a, color);
                break;
            case "PieChart":
                throughtData = _.take(throughtData, 8);
                var max = _.max(throughtData, function (d) {
                    return d.value;
                }).value;
                throughtData = _.filter(throughtData, function (d) {
                    return d.value > max * 0.05;
                });

                drawPieChart(throughtData, a, color);
                break;
            case "WordCloud":
                makeWordCloud(throughtData, a, color);
                break;
            case "Network":
                console.log("Create Network");
                drawNetwork01(a, color);
                break;
        }


    }

    function makeFilterOption() {
        var opts = [];
        _.each($('input.qu[type="checkbox"]'), function (ele) {
            var input = $(ele);
            if (input.is(':checked')) {
                console.log(input.attr('q_code'), input.attr('cat'));
                var q_code = input.attr('q_code');
                var cat = input.attr('cat');
                var q = _.find(opts, function (opt) {
                    return opt.q == q_code;
                });
                if (_.isNil(q))
                    opts.push({
                        q: q_code,
                        cat: [cat],
                    });
                else q.cat.push(cat);
            }
        });
        return opts;
    }

    function filterData(option, isOr) {
        var ans = {};
        if (_.isNil(isOr)) isOr = true;
        var data;
        if (_.isNil(option) || option.length == 0) {
            console.log('opt nil');
            data = origin_data;
        } else {
            console.log('opt exist');
            data = _.filter(origin_data, function (d) {
                var ret = false;
                var matches = _.map(option, function (p) {
                    var match = false;
                    var matcher = _.find(d, function (e) {
                        return e.q === p.q;
                    });
                    if (_.isNil(matcher)) return false;
                    _.each(p.cat, function (c) {
                        if (match) return;
                        // console.log(matcher);
                        match = _.indexOf(matcher.a_cat, c) != -1;
                    });
                    return match;
                });
                if (isOr) ret = _.indexOf(matches, true) != -1;
                else ret = _.indexOf(matches, false) == -1;
                return ret;
            });
        }
        console.log('option', option);
        console.log('data', origin_data);

        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi

        _.map(data, function (ds) {
            _.each(ds, function (d) {
                if (_.isNil(ans[d.q])) ans[d.q] = [];
                var a = ans[d.q];

                if (_.isNil(d.a)) return;

                var value = d.a + '';
                value = value.replace(regExp, " ");

                var val = value;

                var c = _.find(a, {key: val});
                if (_.isNil(c)) a.push({key: val, value: 1});
                else c.value++;

                var keySummary = d.q + '_summary';
                if (_.isNil(ans[keySummary])) ans[keySummary] = [];

                var as = ans[keySummary];

                var values = value.split(' ');
                values = _.remove(values, function (v) {
                    return v != '';
                });
                d.a_cat = values;

                _.each(values, function (v) {
                    if (v == '' || (v.length == 1 && v != '술' && v != '남' && v != '여')) return;
                    if (_.indexOf(continueWords, v) != -1) return;
                    var d = _.find(as, {key: v});
                    if (_.isNil(d)) as.push({
                        key: v,
                        value: 1
                    });
                    else d.value++;
                });
            })
        });

        var idx = 5;
        var takes = _.take(_.sortBy(ans['q' + idx + '_summary'], function (o) {
            return -o.value;
        }), 30);

        return {
            data: data,
            ans: ans,
        };
    }

    var continueWords = ['혼자', '내가', '있는', '있다', '없다', '하고싶은', '로움', '로운', '하고', '롭게', '롭다',
        '아직', '제약이', '로워진다', '원하는', '많은', '많이', '싶다', '하러가기', '딱히'];

    // 질문에 따라 색상 나열 변경
    function colorPicker(Q, Vis) {
        console.log(Q);
        var color = ['#354252', '#F07774', '#524642', '#6da9b5', '#fcb129', '#54728b', '#EAC2B2', '#8f8d92'];

        if (Q === 'q14_summary') {
            color = ['#F07774', '#354252', '#524642', '#6da9b5', '#fcb129', '#54728b', '#EAC2B2', '#8f8d92'];
        }
        if(Q === 'q15_summary'){
            color = colorPalette(175, 119, 102);
            color = _.map(color,function(d){
                return rgbToHex(d[0], d[1], d[2]);
            })

        }
        if(Q === 'q16_summary'){
            color = colorPalette(84, 114, 139);
            color = _.map(color,function(d){
                return rgbToHex(d[0], d[1], d[2]);
            })

        }



        console.log(color);
        return color;
    }




    function colorPalette(r, g, b) {
        var hsv = rgb2hsv(r, g, b);
        var colors = [];
        for(var i = 0 ; i < 8 ; i++){
            colors[i] = hsvToRgb(hsv[0], hsv[1], hsv[2] + 7*i);
        }
        return colors;
    }


    function hsvToRgb(h, s, v) {
        var r, g, b;
        var i;
        var f, p, q, t;

        // Make sure our arguments stay in-range
        h = Math.max(0, Math.min(360, h));
        s = Math.max(0, Math.min(100, s));
        v = Math.max(0, Math.min(100, v));

        s /= 100;
        v /= 100;

        if(s == 0) {
            // Achromatic (grey)
            r = g = b = v;
            return [
                Math.round(r * 255),
                Math.round(g * 255),
                Math.round(b * 255)
            ];
        }

        h /= 60; // sector 0 to 5
        i = Math.floor(h);
        f = h - i; // factorial part of h
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));

        switch(i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;

            case 1:
                r = q;
                g = v;
                b = p;
                break;

            case 2:
                r = p;
                g = v;
                b = t;
                break;

            case 3:
                r = p;
                g = q;
                b = v;
                break;

            case 4:
                r = t;
                g = p;
                b = v;
                break;

            default: // case 5:
                r = v;
                g = p;
                b = q;
        }

        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }



    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }



    function rgb2hsv(r, g, b) {

        var computedH = 0;
        var computedS = 0;
        var computedV = 0;

        //remove spaces from input RGB values, convert to int
        var r = parseInt(('' + r).replace(/\s/g, ''), 10);
        var g = parseInt(('' + g).replace(/\s/g, ''), 10);
        var b = parseInt(('' + b).replace(/\s/g, ''), 10);

        if (r == null || g == null || b == null ||
            isNaN(r) || isNaN(g) || isNaN(b)) {
            alert('Please enter numeric RGB values!');
            return;
        }
        if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
            alert('RGB values must be in the range 0 to 255.');
            return;
        }
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var minRGB = Math.min(r, Math.min(g, b));
        var maxRGB = Math.max(r, Math.max(g, b));

        // Black-gray-white
        if (minRGB == maxRGB) {
            computedV = minRGB;
            return [0, 0, computedV];
        }

        // Colors other than black-gray-white:
        var d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
        var h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);
        computedH = Math.floor(60 * (h - d / (maxRGB - minRGB)));
        computedS = Math.ceil(((maxRGB - minRGB) / maxRGB)*100);
        computedV = Math.ceil(maxRGB*100);
        return [computedH, computedS, computedV];
    }


});


