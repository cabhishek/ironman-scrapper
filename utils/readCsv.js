var csv = require("csv-streamify"),
    fs = require('fs'),
    Log = require('log'),
    log = new Log('info'),
    path = require('path');

module.exports = function(fileName, callback) {

    var appDir = path.dirname(require.main.filename),

        stream = fs.createReadStream(appDir + "/data/" + fileName),

        csvStream = csv({
            delimiter: ",",
            quote: '"',
            objectMode: true,
            columns: true
        }, callback),

        dataObjs = [];

    csvStream.on("data", function(data) {
        dataObjs.push(data);
    });

    // pump some data into pipe
    stream.pipe(csvStream);
};
