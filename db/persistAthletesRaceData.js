var Bookshelf = require('./dbInitialize')(),
    _s = require('underscore.string'),
    _ = require('underscore'),
    async = require('async'),
    Log = require('log'),
    log = new Log('info');


module.exports = function persistAthletesRaceData(raceData) {

    var Athlete = Bookshelf.Model.extend({
        tableName: 'athletes'
    });

    new Athlete({
        'athlinks_id': raceData.athlinksId,
        'first_name': raceData.firstName,
        'last_name': raceData.lastName
    }).fetch()
        .then(function(model) {

            if (model) {
                createAthleteRaceData(model, raceData);
            } else {
                createAthlete(raceData);
            }
        });

};

function createAthleteRaceData(athlete, raceData) {
    var AthleteRace = Bookshelf.Model.extend({
        tableName: 'athlete_races',

        hasTimestamps: ['created', 'modified']
    });

    var Race = Bookshelf.Model.extend({
        tableName: 'races'
    });

    new Race({
        name: raceData.name,
        athlinks_event_id: raceData.eventid,
        athlinks_course_id: raceData.courseid
    }).fetch()
        .then(function(race) {

            if(_.isUndefined(race) || _.isNull(race))
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
                console.log("Athlete race data saved for %s", athlete.get('id'));
            });

        });
}

function createAthlete(raceData) {

    var Athlete = Bookshelf.Model.extend({
        tableName: 'athletes',
        hasTimestamps: ['created', 'modified']
    });

    Athlete.forge({
        first_name: raceData.firstName,
        last_name: raceData.lastName,
        athlinks_id: raceData.athlinksId,

    }).save().then(function(model) {
        log.info("Created athlete %s %s %s", raceData.athlinksId, raceData.firstName, raceData.lastName);

        createAthleteRaceData(model, raceData);
    });
}
