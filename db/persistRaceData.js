var db = require('./initialize')(),
    Race = require('../models/race'),
    raceHistory = require('../races/raceHistory'),
    helper = require('../helper'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    async = require('async');

(function main() {

    var raceName = process.argv[2] || "Ironman Florida";
    log.info("RaceName =>%s", raceName);

    //Get all race history.
    var races = raceHistory(raceName);

    // Space sperated list "2009 2010"
    var years = process.argv[3];

    if (years)
        races = helper.filterByYear(races, years);

    async.each(races, persist, function(err) {
        if (err) throw err;
    });

})();

function persist(race, callback) {

    Race.forge({
        name: race.name,
        year: race.year,
        type: race.type,
        athlinks_event_id: race.eventId,
        athlinks_course_id: race.courseId

    }).save().then(function() {
        log.info('Race =>%s year=>%s saved !!', race.name, race.year);
        callback();
    });
}
