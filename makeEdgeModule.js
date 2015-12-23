/**
 * Created by hyunwoo on 12/23/15.
 */
var x = [ 1, 2, 3, 4, 5 ],
    y = [ 5, 4, 3, 2, 1 ];


var gs = require('./gs2_data');

//console.log(gs.base_data);


var x = [ 1, 2, 3, 4, 5 ],
    y = [ 5, 4, 3, 2, 1 ];

var pcorr = require('compute-pcorr');
var mat = pcorr( gs.base_data.matrix);

console.log(mat);

var edge = [];
for(var i = 0 ; i < mat.length ; i ++){
    for(var j = 0 ; j < mat[i].length ; j ++){
        if(Number(mat[i][j]) > 0.99 ){
            // make edge
            edge.push({
                source : i,
                target : j,
                value : Number(mat[i][j]).toFixed(2),
            })

        }
        //console.log('pcorr [ ' + i + ', ' + j + '] ' +mat[i][j])

    }
}

console.log(edge)



