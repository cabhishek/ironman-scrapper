var helper = require('./helper'),
    db = require('./db/dbInitialize')(),
    raceHistory = require('./races/raceHistory'),
    scrape = require('./scrapper/scrape'),
    persistAthleteRace = require('./db/persistAthleteRace'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    async = require('async'),
    util = require('util'),
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
        if (err) throw err;

        log.info("Scraping and persisting data finished");
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

function persistRaceData(race, athleteRaces) {

    // Combine race + athelete race data
    _.each(athleteRaces, function(athleteRace) {
        _.extend(athleteRace, race);
    });

    async.each(athleteRaces, persistAthleteRace, function(err) {
        if (err) throw err;
    });
}


function scrapePages(racePage, callback) {

    var fileName = helper.getFileName(racePage);
    log.info("Reading file =>%s", fileName);

    fs.readFile(racePage.folderName + '/' + fileName, function(err, rawHtml) {

        var data = scrape(rawHtml, racePage.scraperName);

        callback(null, data);
    });
}
