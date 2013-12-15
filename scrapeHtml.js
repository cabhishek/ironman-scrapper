var helper = require('./helper'),
    raceHistory = require('./races/raceHistory'),
    scrapeData = require('./scrapper/scrape'),
    writeCsv = require('./writeCsv'),
    http = require('client-http'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    async = require('async'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    Log = require('log'),
    log = new Log('info');


function readDataFile(racePage, callback) {

    var fileName = helper.getFileName(racePage);
    log.info("Reading file =>%s", fileName);

    fs.readFile(racePage.folderName + '/' + fileName, function(err, raw_html) {

        var data = scrapeData(raw_html, racePage.scraperName);

        callback(null, data);
    });
}

function createRacePages(race, callback) {

    var folderName = helper.getFolderName(race);

    //Create paginated pages of race data
    var pages = helper.createPages(race);

    racePages = [];

    pages.forEach(function(page) {
        racePages.push(_.clone(_.extend(race, {
            'page': page,
            'folderName': folderName
        })));
    });

    async.concat(racePages, readDataFile, function(err, results) {

        mkdirp(folderName + '/data', function(err) {
            var dataFile = _s.underscored(_s.sprintf('%s/data/%s_%s.csv', folderName, race.name, race.year));
            writeCsv(dataFile, results);

            log.info('Done saving ->%s', dataFile);
        });

    });
}

(function main() {

    var raceName = process.argv[2] || "Ironman Florida";
    log.info("RaceName =>%s", raceName);
    //Get all race history.
    var races = raceHistory(raceName);

    // search for a races by year
    var year = process.argv[3];

    log.info("Year =>%s", year);

    if (year)
        races = _.where(races, {
            year: parseInt(year, 0)
        });

    async.each(races, createRacePages, function(err) {
        if (err)
            log.info("Error getting race history data =>%s", err);
    });

})();
