var db = require('./initialize')(),
    Race = require('../models/race'),
    helper = require('../utils/helper'),
    readCsv = require('../utils/readCsv'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    async = require('async')

(function() {

    readCsv('race_attributes_data.csv', function(err, results) {

        log.info("Total race attributes data count =>%s", results.length)

        async.each(results, persist, function(err) {
            if (err) throw err

            process.exit(0)

        })
    })

})()

function persist(raceAttribute, callback) {

    var names = raceAttribute.name.split(" "),
        race_name = _.first(names, names.length - 1).join(' '),
        race_year = _.last(names)

    log.info("Fetching race =>%s year=>%s", race_name, race_year)

    var race = new Race({
        name: race_name,
        year: race_year
    })

    log.info("Before ->%s", (raceAttribute.startingElevation))
    log.info("After ->%s", _clean(raceAttribute.startingElevation))

    race.fetch().then(function(race) {

        if (race) {

            log.info("Found data for =>%s", race_name)
            log.info("qualifier id =>%s", race.get('qualifier_id'))

            var data = {

                date: raceAttribute.date,
                month: raceAttribute.month,
                location: raceAttribute.location,

                race_type: raceAttribute.raceType,
                registered_athletes: _clean(raceAttribute.registeredAthletes),

                starting_athletes: _clean(raceAttribute.startingAthletes),
                finishing_athletes: _clean(raceAttribute.finishingAthletes),

                qualifying_slots: raceAttribute.qualifyingSlots,
                sunrise: raceAttribute.Sunrise,
                sunset: raceAttribute.Sunset,

                high_temp: raceAttribute.highTemp,
                low_temp: raceAttribute.lowTemp,
                dew_point: raceAttribute.dewPoint,

                high_humidity: raceAttribute.highHumidity,
                low_humidity: raceAttribute.lowHumidity,
                precipitation_inches: raceAttribute.precipitationInches,
                peak_wind_speed: raceAttribute.peakWindSpeed,

                cloud_cover: raceAttribute.cloudCover,

                starting_elevation: _clean(raceAttribute.startingElevation),
                max_elevation: _clean(raceAttribute.maxElevation),
                gross_elevation_gain: _clean(raceAttribute.grossElevationGain),

                water_temperature: raceAttribute.waterTemperature,
                water_body: raceAttribute.waterBody,
                water_type: raceAttribute.waterType,
                swim_start_location: raceAttribute.swimStartLocation,
                swim_start_type: raceAttribute.swimStartType,

                current: raceAttribute.current,
                wetsuit_legal: raceAttribute.wetsuitLegal,
                temp_bike: raceAttribute.tempBike,

                starting_elevation_bike: _clean(raceAttribute.startingElevationBike),
                max_elevation_bike: _clean(raceAttribute.maxElevationBike),
                gross_elevation_gain_bike: _clean(raceAttribute.grossElevationGainBike),

                temp_run: raceAttribute.tempRun,

                starting_elevation_run: _clean(raceAttribute.startingElevationRun),
                max_elevation_run: _clean(raceAttribute.maxElevationRun),
                gross_elevation_gain_run: _clean(raceAttribute.grossElevationGainRun)

            }

            race.save(data, {
                patch: true
            }).then(function() {

                log.info('Race =>%s updated with attributes !!', raceAttribute.name)

                callback()
            }).
            catch(function(e) {
                log.info(e.message)

                callback()
            })

        } else {

            log.info("Race %s not found skipping !!", race_name)

            callback()
        }
    }).
    catch(function(e) {
        log.info(e.message)
        callback()
    })
}

function _clean(value) {

    return value.replace(",", "")
}
