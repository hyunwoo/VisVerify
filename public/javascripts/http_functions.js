/**
 * Created by hyunwoo on 2015-09-16.
 */
function httpGet(url, func) {
    $.get(url, function (rep) {
        func(rep);
    });
}

function httpPost(url, params, func){
    var post = $.post(url, params);
    post.done(function(rep){
        func(rep);
    });
}