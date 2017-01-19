/**
 * Created by hyunwoo on 2017-01-18.
 */
$(function () {

    var t = enter_data;
    var qlist = t[1];
    console.log(qlist);
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
            console.log('create Option : ', qlist[i])
            createFilter(qlist[i], t, 'q' + i);
        }
    }

    filterItem.addClass('initItem');
    checkItem.addClass('initItem');


    function createFilter(name, options, q) {
        console.log('asdf');
        var item = filterItem.clone();
        item.find('.name').html(q + ' ' + name);
        item.appendTo('#filters');

        console.log($('#selectorQuestion').val());

        _.map(options, function (d, i) {
            var opt = checkItem.clone().appendTo(item);
            // console.log(d);
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
        console.log('hello');
        makeFilterOption();

        var selectQ = $('#selectorQuestion option:selected').attr('q_code') + '_summary';
        var selectMessage = $('#selectorQuestion option:selected').text();

        var selectVis = $('#selectorVisMode option:selected').text();

        console.log('select q : ' + selectQ + ' , select vis : ' + selectVis);
        var opts = makeFilterOption();
        var d = filterData(opts, false);
        console.log(JSON.stringify(opts, null, 2));
        console.log(d.ans[selectQ]);


        var throughtData = d.ans[selectQ];
        throughtData = _.sortBy(throughtData, function (d) {
            return -d.value;
        });

        var a = {key: 'Q. ' + selectMessage, 'value': '신입생 여러분들이 대학생이 되면 가장 하고싶은건 바로 연애군요.'};

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

                drawBarChart(throughtData, a);
                break;
            case "PieChart":
                throughtData = _.take(throughtData, 8);
                var max = _.max(throughtData, function (d) {
                    return d.value;
                }).value;
                throughtData = _.filter(throughtData, function (d) {
                    return d.value > max * 0.05;
                });

                drawPieChart(throughtData, a);
                break;
            case "WordCloud":
                makeWordCloud(throughtData, a);
                break;
        }


    }

    function makeFilterOption() {
        var opts = [];
        _.each($('input[type="checkbox"]'), function (ele) {
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
                    })
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
            data = origin_data;
        } else {
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
        '아직', '제약이', '로워진다', '원하는', '많은', '많이', '싶다', '하러가기'];

});
