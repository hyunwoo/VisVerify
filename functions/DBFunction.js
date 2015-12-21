/**
 * Created by Luan on 2015. 12. 21..
 */

var crypto = require('crypto');

exports.getUserID = function (id) {
    return "USER:" + id;
}

exports.getHASH = function (val) {
    return crypto.createHash('sha256').update(val).digest('base64').toString();
}

exports.USER_LIST = 'USER:List';
exports.DATA_LIST = 'DATA:List';


exports.resSendDBError = function (res) {
    res.send({
        success: false,
        message: 'DB ERROR',
    });
};

exports.resSendFailed = function(res, msg){
    res.send({
        success: false,
        message: msg,
    });
}

exports.resSendSuccess = function(res, msg){
    res.send({
        success: true,
        message: msg,
    });
}


exports.UserAuthCheck = function(req){
    if(req.session.user == null) return false;
    if(req.session.authentication != true) return false;
    return true;
}

