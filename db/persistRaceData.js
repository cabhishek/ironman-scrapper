var Bookshelf = require('./dbInitialize')(),
    raceHistory = require('../races/raceHistory'),
    helper = require('../helper'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    async = require('async');

function persistRaceData(race, callback) {
    var Race = Bookshelf.Model.extend({
        tableName: 'races',
        hasTimestamps: ['created', 'modified']

    });

    Race.forge({
        name: race.name,
        year: race.year,
        type: race.type,
        athlinks_event_id: race.eventid,
        athlinks_course_id: race.courseid

    }).save().then(function() {
        log.info('Race =>%s year=>%s saved !!', race.name, race.year);
        callback();
    });
}

(function main() {

    var raceName = process.argv[2] || "Ironman Florida";
    log.info("RaceName =>%s", raceName);

    //Get all race history.
    var races = raceHistory(raceName);

    // search for a races by year
    var year = process.argv[3];

    if (year)
        races = _.where(races, {
            year: parseInt(year, 0)
        });

    async.each(races, persistRaceData, function(err) {
        if (err)
            log.info("Error getting race history data =>%s", err);
    });

})();
