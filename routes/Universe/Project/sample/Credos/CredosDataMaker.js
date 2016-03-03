/**
 * Created by Hyunwoo on 2016. 3. 1..
 */
/**
 * Created by Hyunwoo on 2016. 2. 29..
 */

var fs = require('fs');
//var corr = require('matrix-correlation');
//var corr = require('node-correlation');
var Iconv = require('iconv').Iconv;

var euckr2utf8 = new Iconv('EUC-KR', 'UTF-8');
var utf82euckr = new Iconv('UTF-8', 'EUC-KR');


console.log(__dirname);
var csv = euckr2utf8.convert(fs.readFileSync(__dirname + "/RawData/credos_mortality.csv")).toString().split('\n');
var csv_keys = fs.readFileSync(__dirname + "/RawData/credos_check").toString();

var csv_keys_line = csv_keys.split('\n');

var keys = csv[0].split(',');
var table = [];
var beforeEmpty = true;
var setFunction = false;
var temp;
var isBrace = false;
for (var i = 0; i < csv_keys_line.length; i++) {
    var line = csv_keys_line[i];
    if (line.indexOf('/*') != -1) {
        isBrace = true;
    }
    if (isBrace) {
        if (line.indexOf('*/') != -1) isBrace = false;
        continue;
    }
    if (line.indexOf('//') != -1) continue;
    if (line != '') {
        if (beforeEmpty) {
            setFunction = false;
            var val = line.split(',');
            temp = {
                name: val[0],
                category: [],
                type: val[1],
                group: val[2],
            };
            table.push(temp);
            beforeEmpty = false;
        } else {
            var obj = {};
            obj[line.split('\t')[0].split(' ')[0]] = 0;
            temp.category.push(obj);
        }
    } else {
        if (!setFunction) {
            setFunction = true;
        }
        beforeEmpty = true;
    }
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
var count = 0;
var zeroKeys = [
    'rf_',
    'q_',
    'ne_',
    'b_',
];

var returnKeys = [
    'gov_id_sec',
    'sd_age',
    'sex',
]

var tableMax = clone(table);

function makeCsvToData(d) {

    var data = clone(table);
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].category.length; j++) {
            var k = Object.keys(table[i].category[j])[0];
            if (d[k] === undefined || d[k] === '') {
                var setted = false;

                for (var kk = 0; kk < returnKeys.length; kk++) {
                    if (k.indexOf(returnKeys[kk]) != -1) {
                        console.log('ret');
                        return null;
                    }
                }

                for (var kk = 0; kk < zeroKeys.length; kk++) {
                    if (k.indexOf(zeroKeys[kk]) != -1) {
                        d[k] = 0;
                    }
                }
            }

            if (k.indexOf('rf') != -1) {
                if (d[k] === '#N/A' || d[k] === undefined || d[k] == 0) d[k] = 0;
                else d[k] = 1;
            }


            if (isNumber(d[k]))
                data[i].category[j] = Number(d[k]);
            else
                data[i].category[j] = d[k];


            if (setted && isNumber(d[k])) {
                var current = Number(tableMax[i].category[j][k]);
                if (current === undefined
                    || current === ''
                    || current < d[k]) {
                    tableMax[i].category[j][k] = d[k];
                }
            }
        }

        if (table[i].type == '2') {
            var value = 0;
            for (var j = 0; j < table[i].category.length; j++) {
                var k = Object.keys(table[i].category[j])[0];
                value += Number(d[k]);
            }
            data[i].value = value;
        }
    }


    var groupdata = {
        name: 'groupdata',
        values: [],
    };

    for (var i = 0; i < data.length; i++) {
        if (groupdata.values[data[i].group] === undefined) {
            groupdata.values[data[i].group] = [];
        }

        if (data[i].type == '2') {
            groupdata.values[data[i].group].push(data[i].value)
        } else {
            for (var j = 0; j < data[i].category.length; j++) {
                groupdata.values[data[i].group].push(data[i].category[j])
            }

        }
    }
    data.push(groupdata)
    return data;
    count++;
}


function isNumber(s) {
    s += ''; // 문자열로 변환
    s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
    if (s == '' || isNaN(s)) return false;
    return true;
}




var keys = csv[0].split(',');
var total_data = [];
var final_data = {};
var indexed_data = [];
//for (var i = 1; i < 2; i++) {
for (var i = 1; i < csv.length; i++) {
    var d = csv[i].split(',');
    var each = {}
    for (var j = 0; j < keys.length; j++) {
        each[keys[j]] = d[j].split('\t')[0].split(' ')[0];
    }
    total_data.push(each);
}

var d = makeCsvToData(total_data[0]);


var cnt = {};
var ct = {};
var checkList = [];
for (var i = 0; i < total_data.length; i++) {
    if (cnt[total_data[i]['gov_id_sec']] == undefined) cnt[total_data[i]['gov_id_sec']] = 1;
    else cnt[total_data[i]['gov_id_sec']]++;
}


var record_count = 4;
for (var i = 0; i < total_data.length; i++) {
    if (cnt[total_data[i]['gov_id_sec']] >= record_count) {
        if (final_data[total_data[i]['gov_id_sec']] === undefined) final_data[total_data[i]['gov_id_sec']] = [];

        var d = makeCsvToData(total_data[i]);
        if (d != null)
            final_data[total_data[i]['gov_id_sec']].push(d)

    }
}


var dataKeys = Object.keys(final_data);

for (var i = 0; i < dataKeys.length; i++) {
    var origin = final_data[dataKeys[i]];
    var d = {}
    for (var j = 0; j < origin.length; j++) {
        for(var k = 0 ; k < origin[j].length ; k ++){
            if(d[origin[j][k].name] === undefined){
                d[origin[j][k].name] = {
                    values : [],
                    name : origin[j][k].name,
                }
            }

            if(origin[j][k].category !== undefined)
                d[origin[j][k].name].values.push(origin[j][k].category)

            if(origin[j][k].values !== undefined)
                d[origin[j][k].name].values.push(origin[j][k].values)

        }

    }
    indexed_data.push(d);
}
var k = Object.keys(final_data);
console.log('totalKeys', +k.length)


fs.writeFile(__dirname + '/credos_record_' + record_count + '+.json', JSON.stringify(final_data, null, '\t'), function (e, d) {
    console.log(e, d)
})


fs.writeFile(__dirname + '/credos_record_' + record_count + '+_indexed.json', JSON.stringify(indexed_data, null, '\t'), function (e, d) {
    console.log(e, d)
})











