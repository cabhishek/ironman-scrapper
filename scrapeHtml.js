var helper = require('./helper'),
    raceHistory = require('./races/raceHistory'),
    scrape = require('./scrapper/scrape'),
    persistAthletesRaceData = require('./db/persistAthletesRaceData'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    util = require('util'),
    async = require('async'),
    fs = require('fs'),
    Log = require('log'),
    log = new Log('info');

(function main() {

    var raceName = process.argv[2] || "Ironman Florida";
    log.info("RaceName =>%s", raceName);

    // All race history.
    var races = raceHistory(raceName);

    // Search for a races by year
    var year = process.argv[3];

    if (year)
        races = _.where(races, {
            year: parseInt(year, 0)
        });

    async.each(races, createRacePages, function(err) {
        if (err) {
            log.info("Error getting race history data =>%s", err);
        } else {

            log.info("Scraping and persisting data finished");
        }

    });

})();

function createRacePages(race, callback) {

    var folderName = helper.getFolderName(race);

    //Create paginated pages of race data
    var pages = helper.createPages(race);

    racePages = [];

    _.each(pages, function(page) {
        racePages.push(_.clone(_.extend(race, {
            'page': page,
            'folderName': folderName
        })));
    });

    async.concat(racePages, scrapePages, function(err, results) {
        persistRaceData(race, results);
    });
}

function persistRaceData(race, results) {

    _.each(results, function(result) {
        _.extend(result, race);
    });

    async.each(results, persistAthletesRaceData, function(err) {

    });
    // _.each(results, function(result) {
    //     console.log(result);
    // });

    // log.info("Total records =>%s", results.length);
    // log.info('Done saving %s %s', race.name, race.year);
}


function scrapePages(racePage, callback) {

    var fileName = helper.getFileName(racePage);
    log.info("Reading file =>%s", fileName);

    fs.readFile(racePage.folderName + '/' + fileName, function(err, rawHtml) {

        var data = scrape(rawHtml, racePage.scraperName);

        callback(null, data);
    });
}
