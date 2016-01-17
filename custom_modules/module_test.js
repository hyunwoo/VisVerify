/**
 * Created by hyunwoo on 1/5/16.
 */


/**
// 모듈 임포트
var fs = require('fs-extra');
// 파일 읽기
var default_data = fs.readFileSync('./population.csv').toString();

// 엔터를 기준으로 각 줄 분리
var lines = default_data.split('\n');

// ,를 기준으로 첫줄을 분리해서 값 이름을 구함
var header = lines[0].split(',');

// 자료를 저장할 배열을 생성
var JSONValues = [];

// 나머지 줄을 ,로 분리해서 JSON에 대입
for(var i = 1 ; i < lines.length ; i ++){
    var values = lines[i].split(',');
    var data = {};
    for(var j = 0 ; j < header.length; j ++)
        data[header[j]] = values[j];

    JSONValues.push(data);
}


fs.outputJson('./output.json', JSONValues , function(err){
    console.log(err);
})


*/


var pcorr = require( 'compute-pcorr' );

    var x = [ 1, 2, 3, 4, 5 ],
    y = [ 5, 4, 3, 2, 1 ];

var z = [ 3, 2, 5, 1 ,2 ];

var mat = pcorr( x, y, z );

console.log(mat);