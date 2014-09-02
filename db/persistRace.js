var db = require('./initialize')(),
    Race = require('../models/race'),
    raceNames = require('../raceConfig/raceNames'),
    raceHistory = require('../raceConfig/raceHistory'),
    helper = require('../utils/helper'),
    _ = require('underscore'),
    argv = require('minimist')(process.argv.slice(2)),
    Log = require('log'),
    log = new Log('info'),
    async = require('async');

// Function to presist race data
// years if passed are in comma seperated format e.g "2013,2012,1998"
(function() {

    var raceName = argv.name,
        years = argv.years,
        races = []

    if (!raceName) {

        log.info("Persisting data for all races")

        _.each(raceNames, function(raceName) {
            races.push(appendQualifierId(raceHistory(raceName)))

            //Each race data is in an array. Hence flatten it out for
            //multiple races.
            races = _.flatten(races)
        })

    } else {
        races = appendQualifierId(raceHistory(raceName))
    }

    if (years) {
        log.info("Years =>%s", years)

        races = helper.filterByYear(races, years)
    }

    async.each(races, persist, function(err) {
        if (err) throw err

        process.exit(0)
    })

})()

function persist(raceData, callback) {

    var race = new Race({
        name: raceData.name,
        athlinks_event_id: raceData.eventId,
        athlinks_course_id: raceData.courseId
    })

    race.fetch().then(function(race) {

        var data = {
            name: raceData.name,
            year: raceData.year,
            type: raceData.type,
            athlinks_event_id: raceData.eventId,
            athlinks_course_id: raceData.courseId,
        }

        if (race) {
            //Update race details
            race.save(data, {
                patch: true
            }).then(function() {
                log.info('Race =>%s year=>%s updated!', raceData.name, raceData.year)

                callback()
            }).
            catch(function(e) {
                log.info(e.message)

                callback()
            })

        } else {

            //Insert new race data
            _.extend(data, {
                qualifier_id: raceData.qualifierId
            })

            Race.forge(data).save().then(function() {
                log.info('Race =>%s year=>%s saved!', raceData.name, raceData.year)

                callback()
            }).
            catch(function(e) {
                log.info(e.message)

                callback()
            })
        }
    })
}

function appendQualifierId(races) {
    var max = 99999
    var min = 2999

    var qualifierId = Math.floor(Math.random() * (max - min + 1) + min)

    log.info("QualifierId =>%s", qualifierId)

    _.each(races, function(race) {
        race.qualifierId = qualifierId
    })

    return races
}
