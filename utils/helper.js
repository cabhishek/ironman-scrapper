var _ = require("underscore"),
  _s = require("underscore.string"),
  util = require("util");

function getFolderName(race) {
  var dataFolder = "data",
    foldername = _s.underscored(
      util.format("%s/%s/%s", dataFolder, race.name, race.year)
    );

  return foldername;
}

function getFileName(race) {
  var fileName = _s.underscored(
    util.format("%s_%s_page_%s.html", race.name, race.year, race.page)
  );

  return fileName;
}

function createPages(race) {
  return _.range(1, race.pages + 1);
}

function filterByYear(races, years) {
  var temp = [];

  if (!years)
    throw "Years is not a comma separated list. Please check it.";

  _.each(years.split(","), function(year) {
    temp.push(_.where(races, { year: parseInt(year, 0) }));
  });

  return _.flatten(temp);
}

function trim(str) {
  return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}

exports.getFolderName = getFolderName;
exports.getFileName = getFileName;
exports.createPages = createPages;
exports.filterByYear = filterByYear;
exports.trim = trim;
