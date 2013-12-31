var db = require('./initialize')(),
    Race = require('../models/race'),
    Qualifier = require('../models/qualifier'),
    helper = require('../utils/helper'),
    readCsv = require('../utils/readCsv'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    async = require('async');

(function() {

    readCsv('qualifier_data.csv', function(err, results) {

        log.info("Total qualifier data count =>%s" % results.length);

        async.each(results, persist, function(err) {
            if (err) throw err;

            process.exit(0);

        });
    });

})();

function persist(qualifier, callback) {

    var race = new Race({
        name: qualifier.name,
    });

    log.info("Fetching race =>%s", qualifier.name);

    race.fetch().then(function(race) {

        if (race) {

            log.info("Found data for =>%s", qualifier.name);
            log.info("Qualifier id =>%s", race.get('qualifier_id'));

            var data = {

                name: qualifier.name,
                qualifier_id: race.get('qualifier_id'),

                month: qualifier.month,
                location: qualifier.location,
                zip_code: qualifier.zipCode,
                race_type: qualifier.raceType,

                qualifying_slots: qualifier.qualifyingSlots,
                sunrise: qualifier.sunrise,
                sunset: qualifier.sunset,

                avg_high_temp: qualifier.avgHighTemp,
                avg_low_temp: qualifier.avgLowTemp,
                avg_high_humidity: qualifier.avgHighHumidity,
                avg_low_humidity: qualifier.avgLowHumidity,

                avg_high_dew_point: qualifier.avgHighDewPoint,
                avg_peak_wind_speed: qualifier.avgPeakWindSpeed,

                probability_of_precipitation: qualifier.probabilityOfPrecipitation,
                probability_of_cloudcover: qualifier.probabilityOfCloudCover,

                starting_elevation: qualifier.startingElevation,
                max_elevation: qualifier.maxElevation,

                gross_evelation_gain: qualifier.grossEvelationGain,
                avg_water_temperature: qualifier.avgWaterTemperature,

                water_body: qualifier.waterBody,
                water_type: qualifier.waterType,

                swim_start_location: qualifier.swimStartLocation,
                swim_start_type: qualifier.swimStartType,
                current: qualifier.current,

                wetsuit_legal: qualifier.wetsuitLegal,
                avg_temp_bike: qualifier.avgTempBike,
                starting_elevation_bike: qualifier.startingElevationBike,

                max_elevation_bike: qualifier.maxElevationBike,
                gross_elevation_gain_bike: qualifier.grossElevationGainBike,

                avg_temp_run: qualifier.avgTempRun,
                starting_elevation_run: qualifier.startingElevationRun,
                max_elevation_run: qualifier.maxElevationRun,
                gross_elevation_gain_run: qualifier.grossElevationGainRun
            };

            Qualifier.forge(data).save().then(function() {
                log.info('Qualifier Race =>%s updated !!', qualifier.name);

                callback();
            });

        } else {

            log.info("Race %s not found skipping !!", qualifier.name);
            callback();
        }
    });
}
