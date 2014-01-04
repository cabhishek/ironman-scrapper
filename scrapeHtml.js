var db = require('./db/initialize')(),
    persistAthleteRace = require('./db/persistAthleteRace'),
    raceHistory = require('./races/raceHistory'),
    scrape = require('./scraper/scrape'),
    helper = require('./utils/helper'),
    _ = require('underscore'),
    async = require('async'),
    util = require('util'),
    fs = require('fs'),
    Log = require('log'),
    log = new Log('info');

(function () {

    var raceName = process.argv[2] || "Ironman Florida",
        races = raceHistory(raceName),
        //Comma sperated list "2009,2010"
        years = process.argv[3];

    log.info("RaceName =>%s", raceName);

    if (years)
        races = helper.filterByYear(races, years);

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
