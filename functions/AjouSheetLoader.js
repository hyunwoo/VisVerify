/**
 * Created by hyunwoo on 2017-01-18.
 */
var sheet = require('google-sheet-to-data')('1rN_WrsmnvGckpuQqgY-X6OOYuU9C2Hfy8iWT-acChIE');
sheet.matrix(2, function (err, rep) {
    console.log(rep[1])
    require('fs').writeFileSync('./data_grad.js', JSON.stringify(rep, null, 2));
})