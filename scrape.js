var db = require('./db/initialize')(),
    persistAthleteRace = require('./db/persistAthleteRace'),
    raceHistory = require('./raceConfig/raceHistory'),
    scrape = require('./scraper/scraper'),
    helper = require('./utils/helper'),
    _ = require('underscore'),
    async = require('async'),
    fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2)),
    Log = require('log'),
    log = new Log('info');

// Main function to kick start things
// years if passed are in comma seperated format e.g "2013,2012,1998"
(function() {

    if (!argv.name)
        throw "Enter a valid race name"

    var races = raceHistory(argv.name)

    if (argv.years)
        races = helper.filterByYear(races, argv.years)

    async.each(races, createRacePages, function(err) {
        if (err) throw err;

        log.info("Scraping and persisting finished !!!");

        process.exit(0);

    });

})();

function createRacePages(race, callback) {

    var folderName = helper.getFolderName(race),
        pages = helper.createPages(race),
        racePages = [];

    _.each(pages, function(page) {
        racePages.push(_.clone(_.extend(race, {
            'page': page,
            'folderName': folderName
        })));
    });

    async.concat(racePages, scrapePage, function(err, results) {

        log.info("Total records to persist =>%s for race =>%s %s", results.length, race.name, race.year);
        //Once all scraping is done for a race year
        //then go persist all of it in DB.
        persist(race, results, callback);
    });
}

function scrapePage(racePage, callback) {

    var fileName = helper.getFileName(racePage);

    log.info("Reading file =>%s", fileName);

    fs.readFile(racePage.folderName + '/' + fileName, function(err, rawHtml) {

        var data = scrape(rawHtml, racePage.scraperName);

        callback(null, data);
    });
}

function persist(race, results, callback) {

    // Combine race + athelete race data
    _.each(results, function(athleteRace) {
        _.extend(athleteRace, race);
    });

    async.each(results, persistAthleteRace, function(err) {
        if (err) throw err;

        log.info("Persisted all athlete race data sucessfully !!");

        callback();
    });
}
