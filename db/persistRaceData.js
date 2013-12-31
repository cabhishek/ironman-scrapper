var db = require('./initialize')(),
    Race = require('../models/race'),
    raceNames = require('../races/raceNames'),
    raceHistory = require('../races/raceHistory'),
    helper = require('../utils/helper'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    async = require('async');

(function() {

    var raceName = process.argv[2] || undefined,
        // Comma sperated list "2009,2010"
        years = process.argv[3],
        races = [];

    if (!raceName) {

        log.info("Persisting data for all race");

        _.each(raceNames, function(raceName) {
            races.push(appendQualifierId(raceHistory(raceName)));

            //Each race data is in an array. Hence flatten it out for
            //multiple races.
            races = _.flatten(races);
        });

    } else {
        races = appendQualifierId(raceHistory(raceName));
    }

    if (years) {
        log.info("Years =>%s", years);

        races = helper.filterByYear(races, years);
    }

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

            race.save(data).then(function() {
                log.info('Race =>%s year=>%s updated !!', raceData.name, raceData.year);

                callback();
            });

        } else {

            Race.forge(data).save().then(function() {
                log.info('Race =>%s year=>%s saved!', raceData.name, raceData.year);

                callback();
            });
        }
    });
}

function appendQualifierId(races) {
    var max = 99999;
    var min = 2999;

    var qualifierId = Math.floor(Math.random() * (max - min + 1) + min);

    log.info("QualifierId =>%s", qualifierId);

    _.each(races, function(race) {
        race.qualifierId = qualifierId;
    });

    return races;
}
