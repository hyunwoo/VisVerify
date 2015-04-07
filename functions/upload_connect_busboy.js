var Busboy = require('busboy');

exports.upload = function(req, res) {
    var busboy = new Busboy({
        headers: req.headers
    });

    busboy.on('error', function(err) {
        console.log(err);
    });

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log(fieldname);
        console.log(file);
        console.log(filename);
        console.log(encoding);
        console.log(mimetype);

        // see other question
        file.resume();

    });

    busboy.on('finish', function() {
        console.log('finish');
    });

    return req.pipe(busboy);

};