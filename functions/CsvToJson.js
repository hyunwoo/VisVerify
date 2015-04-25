/**
 * Created by hyunwoo on 4/9/15.
 */
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");

exports.Parse = function(location,func){
    var fileStream = fs.createReadStream(location);
    var csvConverter = new Converter({constructResult: true});
    console.log('in:' + location);
    csvConverter.on("end_parsed", function (jsonObj) {
        func(jsonObj);
    });
    fileStream.pipe(csvConverter);
}