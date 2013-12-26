var db = require('./db/initialize')(),
    persistAthleteRace = require('./db/persistAthleteRace'),
    raceHistory = require('./races/raceHistory'),
    scrape = require('./scraper/scrape'),
    helper = require('./helper'),
    _ = require('underscore'),
    async = require('async'),
    util = require('util'),
    fs = require('fs'),
    Log = require('log'),
    log = new Log('info');

(function main() {

    var raceName = process.argv[2] || "Ironman Florida",
        races = raceHistory(raceName),
        //Comma sperated list "2009,2010"
        years = process.argv[3];

    log.info("RaceName =>%s", raceName);

    if (years)
        races = helper.filterByYear(races, years);

    async.each(races, createRacePages, function(err) {
        if (err) throw err;

        log.info("Scraping and persisting data finished");
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
        //Once all scraping is done for a race year
        //then go persist all of it in DB.
        persist(race, results);
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

function persist(race, results) {

    // Combine race + athelete race data
    _.each(results, function(athleteRace) {
        _.extend(athleteRace, race);
    });

    async.each(results, persistAthleteRace, function(err) {
        if (err) throw err;
    });
}
