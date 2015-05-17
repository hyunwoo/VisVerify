/**
 * Created by hyunwoo on 5/12/15.
 */

var sentiment = require('sentiment');



exports.sentiment = function(data){
    var r = sentiment(data);
    return r;

};
