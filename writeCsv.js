var fs = require('fs');

module.exports = function writeCsv (file_name, rows){
    var keys = Object.keys(rows[0]);

    var csv_data = [keys.join(',')];

    rows.forEach(function (row) {
        var data = [];

        keys.forEach(function (key) {
            data.push(row[key]);
        });

         csv_data.push(data.join(','));
    });

    csv_data = csv_data.join('\n');

    fs.writeFile(file_name, csv_data);
};
