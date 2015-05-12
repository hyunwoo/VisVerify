/**
 * Created by hyunwoo on 5/12/15.
 */

exports.twitDataToNormalDate = function(date, option){
    var strings = date.split(' ');
    //console.log(" : " + strings);

    var time = strings[3].split(':')[0];
    var result = strings[5] + " "  + strings[1] + " "  + strings[2] + " "  + strings[0] + " :" + time;
    console.log(result);
}