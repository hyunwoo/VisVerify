/**
 * Created by Hyunwoo on 2016. 3. 2..
 */

var rawData;


var dashboard_line;
var dashboard_star;


dashboard_line = d3plus.viz()
    .container("#dashboard_line")
    .type("line")
    .id("date")
    .text("증상")
    .y("value")
    .x("증상")
    .tooltip(["date", "증상", "value"])
    .shape({
        "interpolate": "monotone"
    })

dashboard_star = d3plus.viz()
    .container("#dashboard_starplot")
    .id(["date", "skill"])
    .size("value")
    .type("radar");


setInterval(function () {
    //update_dashboard(null);
}, 2000);


var lineColor = [
    '#00897B',
    '#009688',
    '#26A69A',
    '#4DB6AC',
    '#80CBC4',
    '#B2DFDB',
];

function update_dashboard(d) {
    console.log("in function")

    var recordCount = d.groupdata.values.length;
    var recordsData = [];
    for (var i = 0; i < recordCount; i++) {
        recordsData.push(d.groupdata.values[i][0][3])
    }
    var attr = [];
    var star_data = [];
    var line_data = [];

    // star data
    for (var i = 0; i < recordCount; i++) {
        star_data.push({"date": recordsData[i], "skill": "01.시력", "value": d['상태(기관)'].values[i][0]});
        star_data.push({"date": recordsData[i], "skill": "02.청력", "value": d['상태(기관)'].values[i][1]});
        star_data.push({"date": recordsData[i], "skill": "03.당뇨", "value": d['상태(기관)'].values[i][2]});
        star_data.push({"date": recordsData[i], "skill": "04.고혈압", "value": d['상태(기관)'].values[i][3]});
        star_data.push({"date": recordsData[i], "skill": "05.고지혈증", "value": d['상태(기관)'].values[i][4]});
        star_data.push({"date": recordsData[i], "skill": "06.심장", "value": d['상태(기관)'].values[i][5]});
        star_data.push({"date": recordsData[i], "skill": "07.중풍", "value": d['상태(기관)'].values[i][6]});
        star_data.push({"date": recordsData[i], "skill": "08.뇌손상", "value": d['상태(기관)'].values[i][7]});
        star_data.push({"date": recordsData[i], "skill": "09.CO 중독", "value": d['상태(기관)'].values[i][8]});
        star_data.push({"date": recordsData[i], "skill": "10.뇌수술", "value": d['상태(기관)'].values[i][9]});
        star_data.push({"date": recordsData[i], "skill": "11.매독", "value": d['상태(기관)'].values[i][10]});
        star_data.push({"date": recordsData[i], "skill": "12.갑상선", "value": d['상태(기관)'].values[i][11]});
        star_data.push({"date": recordsData[i], "skill": "13.간장", "value": d['상태(기관)'].values[i][12]});
        star_data.push({"date": recordsData[i], "skill": "14.우울증", "value": d['상태(기관)'].values[i][13]});
        star_data.push({"date": recordsData[i], "skill": "15.신장", "value": d['상태(기관)'].values[i][14]});
        star_data.push({"date": recordsData[i], "skill": "16.폐", "value": d['상태(기관)'].values[i][15]});
        star_data.push({"date": recordsData[i], "skill": "17.관절염", "value": d['상태(기관)'].values[i][16]});
        star_data.push({"date": recordsData[i], "skill": "18.치매", "value": d['상태(기관)'].values[i][17]});
        star_data.push({"date": recordsData[i], "skill": "19.빈혈", "value": d['상태(기관)'].values[i][18]});
        star_data.push({"date": recordsData[i], "skill": "20.만성위장", "value": d['상태(기관)'].values[i][19]});
        star_data.push({"date": recordsData[i], "skill": "21.암", "value": d['상태(기관)'].values[i][20]});
        star_data.push({"date": recordsData[i], "skill": "22.알콜중독", "value": d['상태(기관)'].values[i][21]});
        star_data.push({"date": recordsData[i], "skill": "23.간질", "value": d['상태(기관)'].values[i][22]});
        star_data.push({"date": recordsData[i], "skill": "24.척추골절", "value": d['상태(기관)'].values[i][23]});
        star_data.push({"date": recordsData[i], "skill": "25.사지골절", "value": d['상태(기관)'].values[i][24]});
    }

    // linedata
    for (var i = 0; i < recordCount; i++) {

        var k = '';
        var value = 0;
        var default_value = 0;
        k = '증상-망상';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "01.망상", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-환각';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "02.환각", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-공격/비협조';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "03.공격/비협조", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-우울/낙담';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "04.우울/낙담", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-불안';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "05.불안", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-들뜸/행복함';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "06.들뜸/행복함", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-무감동/무관심';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "07.무감동/무관심", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-충동조절능력감소';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "08.충동조절", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-화';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "09.화", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-비정상 반복';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "10.비정상 ", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-수면장애';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "11.수면장애", "name": "a", "value": value, date: recordsData[i]});
        k = '증상-식습관';
        value = default_value + d[k].values[i][0] + d[k].values[i][1] + d[k].values[i][2];
        line_data.push({"증상": "12.식습관", "name": "a", "value": value, date: recordsData[i]});
    }

    for (var i = 0; i < recordCount; i++) {
        attr.push({
            date: recordsData[i],
            hex: lineColor[i],
        })
    }

    console.log(attr);


    dashboard_star = d3plus.viz()
        .container("#dashboard_starplot")
        .data(star_data)
        .type("stacked")
        .attrs(attr)
        //.id('date')
        .id(['date','skill'])
        .y("value")
        .x("skill")
        .color('hex')
        .size('value')
        .shape({
            "interpolate": "monotone"
        })
        .draw();



    /*dashboard_star = d3plus.viz()
     .container("#dashboard_starplot")
     .data(star_data)
     .type("bar")
     .id("skill")
     .x("date")
     .y("value")
     .draw()*/


    dashboard_line = d3plus.viz()
        .container("#dashboard_line")
        .type("stacked")
        .id("date")
        .text("date")
        .y("value")
        .x("증상")
        .tooltip(["date", "증상", "value"])
        .shape({
            "interpolate": "monotone"
        }).data(line_data)
        .attrs(attr)
        .color('hex')
        .draw()


}
