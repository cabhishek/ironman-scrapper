var fs = require("fs");

module.exports = function writeCsv(fileName, rows) {
  var keys = Object.keys(rows[0]);
  var csvData = [ keys.join(",") ];
  rows.forEach(function(row) {
    var data = [];
    keys.forEach(function(key) {
      data.push(row[key]);
    });

    csvData.push(data.join(","));
  });
  csvData = csvData.join("\n");
  fs.writeFile(fileName, csvData);
};
