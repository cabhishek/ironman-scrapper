var Bookshelf = require("bookshelf").Mysql;

var AthleteRace = Bookshelf.Model.extend({
  tableName: "athlete_races",
  hasTimestamps: [ "created", "modified" ]
});

module.exports = AthleteRace;
