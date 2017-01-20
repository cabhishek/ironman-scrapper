var csv = require("csv-streamify"),
  settings = require("../settings"),
  fs = require("fs"),
  Log = require("log"),
  log = new Log("info"),
  path = require("path");

module.exports = function(fileName, callback) {
  var stream = fs.createReadStream(settings.PROJECT_DIR + "/data/" + fileName),
    csvStream = csv(
      { delimiter: ",", quote: '"', objectMode: true, columns: true },
      callback
    ),
    dataObjs = [];
  csvStream.on("data", function(data) {
    dataObjs.push(data);
  });
  log.info("Root dir =>%s", settings.PROJECT_DIR);
  // pump some data into pipe
  stream.pipe(csvStream);
};
