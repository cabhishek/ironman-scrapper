var db = require('./initialize')(),
    Race = require('../models/race'),
    raceHistory = require('../races/raceHistory'),
    helper = require('../helper'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    async = require('async');

(function main() {

    var raceName = process.argv[2] || "Ironman Florida",
        races = appendQualifierId(raceHistory(raceName)),
        // Comma sperated list "2009,2010"
        years = process.argv[3];

    log.info("RaceName =>%s", raceName);

    if (years)
        races = helper.filterByYear(races, years);

    async.each(races, persist, function(err) {
        if (err) throw err;

        process.exit(0);
    });

})();

function persist(raceData, callback) {

    var race = new Race({
        name: raceData.name,
        athlinks_event_id: raceData.eventId,
        athlinks_course_id: raceData.courseId
    });

    race.fetch().then(function(race) {

        var data = {
            name: raceData.name,
            year: raceData.year,
            type: raceData.type,
            athlinks_event_id: raceData.eventId,
            athlinks_course_id: raceData.courseId,
            qualifier_id: raceData.qualifierId

        };

        if (race) {
            log.info("Race already saved.. updating...");

            race.save(data).then(function() {
                log.info('Race =>%s year=>%s updated !!', raceData.name, raceData.year);

                callback();
            });

        } else {
            Race.forge(data).save().then(function() {
                log.info('Race =>%s year=>%s saved !!', raceData.name, raceData.year);

                callback();
            });
        }
    });
}

function appendQualifierId(races) {
    var max = 99999;
    var min = 2999;
    var qualifierId = Math.floor(Math.random() * (max - min + 1) + min);

    log.info("qualifierId =>%s", qualifierId);

    _.each(races, function(race) {
        race.qualifierId = qualifierId;
    });

    return races;
}
