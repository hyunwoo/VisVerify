/**
 * Created by hyunwoo on 2017-01-18.
 */

var mod = require('korean-text-analytics');
var task = new mod.TaskQueue();
var _ = require('lodash');


return;
var fs = require('fs');
var txt = fs.readFileSync('./data_grad.js').toString();
txt = txt.replace('nice', '나이스');
var t = JSON.parse(txt);

var qlist = t[1];

t = _.drop(t, 2);
var data = _.map(t, function (d) {
    return _.map(d, function (e, i) {
        return {
            q: 'q' + i,
            q_total: qlist[i],
            a: e,
            a_cat: [],
        }
    });
});


var qType = {
    q1: '',
    q16: 'location',
};

var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
var ans = {};
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
            if (v == '' || v.length == 1) return;
            var d = _.find(as, {key: v});
            if (_.isNil(d)) as.push({
                key: v,
                value: 1
            });
            else d.value++;
        });
    })
});

//console.log(qlist);
var idx = 5;
console.log(qlist[idx]);
var takes = _.take(_.sortBy(ans['q' + idx + '_summary'], function (o) {
    return -o.value;
}), 30);
console.log(takes);
//console.log(_.sortBy(ans.q5_summary, function(o){ return o.});
return;

task.addSteamTask('동해물과 백두산이 마르고 닳도록', {comment: '추가 정보'});
task.addSteamTask('하느님이 보우하사 우리나라만세', {comment: '추가 정보'});

task.exec(function (err, rep) {
    var tags = mod.ResultOnlyTags(rep);
    console.log(tags);
});