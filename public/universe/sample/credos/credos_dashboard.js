/**
 * Created by Hyunwoo on 2016. 3. 2..
 */

var rawData;
function init_dashboard(){
    $.get('/universe/samples/credos/api/rawData', function(data,success) {
        if(success) rawData = data;
        console.log(rawData);
    });

    var sample_data = [
        {"name": "11/19/2009", "skill": "시력", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "청력", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "당뇨", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "고혈압", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "고지혈증", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "심장", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "중풍", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "뇌손상", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "CO 중독", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "뇌수술", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "매독", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "갑상선", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "간장", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "우울증", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "신장", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "폐", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "관절염", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "치매", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "빈혈", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "만성위장", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "암", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "알콜중독", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "간질", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "척추골절", "value": Math.floor(Math.random() * 2) + 1},
        {"name": "11/19/2009", "skill": "사지골절", "value": Math.floor(Math.random() * 2) + 1},

    ];
    var visualization = d3plus.viz()
        .container("#dashboard_starplot")
        .data(sample_data)
        .id(["name", "skill"])
        .size("value")
        .type("radar")
        .draw();

    var line_data = [
        {"증상": "01.망상", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "02.환각", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "03.공격/비협조", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "04.우울/낙담", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "05.불안", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "06.들뜸/행복함", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "07.무감동/무관심", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "08.충동조절", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "09.화", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "10.비정상 ", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "11.수면장애", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},
        {"증상": "12.식습관", "name": "a", "value": Math.floor(Math.random() * 15), date :'11/19/2009'},


    ]

    var dashboard_line = d3plus.viz()
        .container("#dashboard_line")
        .data(line_data)
        .type("line")
        .id("name")
        .text("증상")
        .y("value")
        .x("증상")
        .tooltip(["date", "증상", "value"])
        .shape({
            "interpolate": "monotone"
        })
        .draw()

}


init_dashboard()
