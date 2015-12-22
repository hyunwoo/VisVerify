/**
 * Created by Luan on 2015. 12. 21..
 */

var crypto = require('crypto');
var Func = require('./defaultFunctions');

var db = require('redis').createClient(6500, '202.30.24.169');
exports.db = db;

exports.getUserID = function (email) {
    return "USER:" + email;
}

exports.getDataUniqueID = function(){
    return Func.getUnique();
}
exports.getUserData = function (email, unique) {
    return "USER:" + email + ":" + unique;
}

exports.getUserDataList = function (email) {
    return "DATALIST:" + email ;
}


exports.getUserERROR = function(email){
    return "USER:" + email + ":ERROR";
}

exports.getUserINFO = function(email){
    return "USER:" + email + ":INFO";
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

