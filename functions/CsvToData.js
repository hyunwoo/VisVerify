/**
 * Created by hyunwoo on 12/22/15.
 */

var Converter = require("csvtojson").core.Converter;
var fs = require("fs");


exports.Read = readfile;
exports.ReadCsvToData = readCsvToData;


function readfile(location, func){
    fs.readFile(location, 'utf8', function(err, data) {
        // the data is passed to the callback in the second argument
        if(err == null){
            func({
                success : false,
                data : data,
            });
        } else {
            func({
                success : false,
                data : err,
            })
        }
    });
}

function readCsvToData(location, func){
    var read = readfile(location, func);
    if(!read.success) {
        func (read);
        return;
    }

    var csv = {
        head : [],
        element_keys : [],
        element : [],
    }

}

