var db = require('./initialize')(),
    Race = require('../models/race'),
    helper = require('../utils/helper'),
    readCsv = require('../utils/readCsv'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    async = require('async');

(function () {

    readCsv('qualifier_data.csv', function(err, results){

        _.each(results, function(result){
            log.info(result);
        });
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
