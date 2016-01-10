/**
 * Created by hyunwoo on 1/5/16.
 */


// 모듈 임포트
var fs = require('fs-extra');
// 파일 읽기
var default_data = fs.readFileSync('./population.csv').toString();

// 내용 출력
console.log(default_data);

var lines = default_data.split('\n');

var header = lines[0].split(',');
console.log(header)



