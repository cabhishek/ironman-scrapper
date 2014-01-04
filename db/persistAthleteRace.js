var AthleteRace = require('../models/athleteRace'),
    Athlete = require('../models/athlete'),
    Race = require('../models/race'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    async = require('async'),
    Log = require('log'),
    log = new Log('info');


module.exports = function persistAthleteRace(raceData, callback) {

    var athlete = new Athlete({
        'athlinks_id': raceData.athlinksId,
        'first_name': raceData.firstName,
        'last_name': raceData.lastName
    });

    athlete.fetch()
        .then(function(athlete) {

            if (athlete) {
                log.info("Found athlete %s %s", athlete.get('first_name'), athlete.get('last_name'));
                persistAthleteRaceData(athlete, raceData, callback);

            } else {
                createAthlete(raceData, callback);
            }
        }).
    catch (function(e) {
        log.info(e.message);

        callback();
    });
};

function createAthlete(raceData, callback) {

    Athlete.forge({
        first_name: raceData.firstName,
        last_name: raceData.lastName,
        athlinks_id: raceData.athlinksId,

    }).save().then(function(athlete) {
        log.info("Created athlete %s %s %s", raceData.athlinksId, raceData.firstName, raceData.lastName);

        persistAthleteRaceData(athlete, raceData, callback);
    }).
    catch (function(e) {
        log.info(e.message);

        callback();
    });
}

function persistAthleteRaceData(athlete, raceData, callback) {

    var race = new Race({
        name: raceData.name,
        athlinks_event_id: raceData.eventId,
        athlinks_course_id: raceData.courseId
    });

    race.on('fetched', function(race) {

        if (!race)
            throw "Failed to get race data";

        AthleteRace.forge({
            athlete_id: athlete.get('id'),
            race_id: race.get('id'),

            ago: raceData.ago,
            claimed: raceData.claimed,
            m_f: raceData.m_f,
            age: raceData.age,
            bib: raceData.bib,

            swim_time: raceData.swimTime,
            swim_pace: raceData.swimPace,
            swim_ago: raceData.swimAgo,

            t1: raceData.t1,

            cycle_time: raceData.cycleTime,
            cycle_speed: raceData.cycleSpeed,
            cycle_ago: raceData.cycleAgo,

            t2: raceData.t2,

            run_time: raceData.runTime,
            run_pace: raceData.runPace,
            run_ago: raceData.runAgo,

            final_time: raceData.finalTime

        }).save().then(function() {
            log.info("Athlete race data saved for %s %s", athlete.get('first_name'), athlete.get('last_name'));

            callback();
        }).
        catch (function(e) {
            log.info(e.message);

            callback();
        });

    });

    race.fetch();
}
