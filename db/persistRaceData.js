var db = require('./dbInitialize')(),
    Race = require('../models/race'),
    raceHistory = require('../races/raceHistory'),
    helper = require('../helper'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    async = require('async');

function persistRaceData(race) {

    Race.forge({
        name: race.name,
        year: race.year,
        type: race.type,
        athlinks_event_id: race.eventId,
        athlinks_course_id: race.courseId

    }).save().then(function() {
        log.info('Race =>%s year=>%s saved !!', race.name, race.year);
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
