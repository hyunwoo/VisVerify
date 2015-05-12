/**
 * Created by hyunwoo on 5/12/15.
 */

var sentiment = require('sentiment');



exports.sentiment = function(data){
    var r1 = sentiment(data);
    console.log(r1);        // Score: -2, Comparative: -0.666

};
