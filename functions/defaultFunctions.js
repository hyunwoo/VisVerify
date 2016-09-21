/**
 * Created by Luan on 15. 3. 25..
 */
var moment = require('moment')


Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|ffff|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy":
                return d.getFullYear();
            case "yy":
                return (d.getFullYear() % 1000).zf(2);
            case "MM":
                return (d.getMonth() + 1).zf(2);
            case "dd":
                return d.getDate().zf(2);
            case "E":
                return weekName[d.getDay()];
            case "HH":
                return d.getHours().zf(2);
            case "hh":
                return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "ffff":
                return d.getMilliseconds().zf(4);
            case "mm":
                return d.getMinutes().zf(2);
            case "ss":
                return d.getSeconds().zf(2);

            case "a/p":
                return d.getHours() < 12 ? "오전" : "오후";
            default:
                console.log($1);
                return $1;
        }
    });
};

String.prototype.string = function (len) {
    var s = '', i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function (len) {
    return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};


exports.isEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
exports.getDay = function () {
    var date = new Date();
    var time = date.format("yyyy.MM.dd");
    return time;
}
exports.getDate = function () {
    return moment().format();
}

exports.getUnique = function () {
    return moment().valueOf();
}

exports.getDateNoDot = function () {
    var date = new Date();
    var time = date.format("yyyyMMddHHmmss");
    return time;
}

exports.getDateDetailNoDot = function () {
    var date = new Date();
    var time = date.format("yyyyMMddHHmmssffff");
    return time;
}

exports.getDateDetail = function () {
    var date = new Date();
    var time = date.format("yyyy.MM.dd.HH:mm:ss:ffff");
    return time;
}

exports.getTick = function () {
    var tick = new Date();
    return tick;
}
exports.twitDataToNormalDate = function (date, option) {
    var strings = date.split(' ');
    //console.log(" : " + strings);

    var time = strings[3].split(':')[0];
    var result = strings[5] + " " + strings[1] + " " + strings[2] + " " + strings[0] + " :" + time;
    console.log(result);
}


var email = require('emailjs/email');
var server = email.server.connect({
    user: "h.hyunwoo@gmail.com",
    password: "fpdkfvkzm",
    host: "smtp.gmail.com",
    ssl: true

});

exports.ColorSet = [
    '#a0a0a0',
    '#ec5411',
    '#0b977e',
    '#db962e',
    '#0783a0',
    '#6686b7',
    '#b890aa',
    '#a06090',
    '#9c2370',
    '#c4292b',

];


exports.sendEmail = function (title, body) {
    server.send({
        text: body,
        from: "<h.hyunwoo@gmail.com>",
        to: "<h.hyunwoo@gmail.com>",
        cc: "",
        subject: title
    }, function (err, message) {
        console.log(err || message);
    });
}
