/**
 * Created by hyunwoo on 4/9/15.
 */
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");




exports.Parse = function(location,func){
    var fileStream = fs.createReadStream(location,  { encoding : 'utf-8' } );
    var csvConverter = new Converter({constructResult: true});
    csvConverter.on("end_parsed", function (jsonObj) {
        func(jsonObj);
    });
    fileStream.pipe(csvConverter);
}

exports.ParseString = function(str, func){
    var csvConverter = new Converter({constructResult: true});
    csvConverter.on("end_parsed", function (jsonObj) {
        func(jsonObj);
    });

    csvConverter.fromString(str, function (jsonObj) {
        func(jsonObj);
    });
}