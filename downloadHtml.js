var raceHistory = require('./races/raceHistory'),
    helper = require('./helper'),
    http = require('client-http'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    get_url = require('./url'),
    mkdirp = require('mkdirp'),
    async = require('async'),
    path = require('path'),
    fs = require('fs'),
    Log = require('log'),
    log = new Log('info');

function downloadData(racePage, callback) {

    var url = get_url(racePage);
    var fileName = helper.getFileName(racePage);

    http.get(url, function(raw_html, err) {

        fs.writeFile(racePage.folderName + '/' + fileName, raw_html, function(err) {

            if (err) {
                log.info(err);
            } else {
                log.info("The %s was saved!", fileName);
            }
        });
    });
}

function getRaceData(race, callback) {

    var folderName = helper.getFolderName(race);

    //Create folder to save all data
    mkdirp(folderName, function(err) {});

    //Create paginated pages of race data
    var pages = helper.createPages(race);

    log.info("Created folderName =>%s", folderName);
    log.info("Race name =>%s", race.name);
    log.info("Race year =>%s", race.year);
    log.info("Total pages =>%s", race.pages);

    racePages = [];

    pages.forEach(function(page) {
        racePages.push(_.clone(_.extend(race, {
            'page': page,
            'folderName': folderName
        })));
    });


    async.each(racePages, downloadData, function(err) {
        if (err)
            console.log("Error downloading race page data =>" + err);
        console.log("Done downloading all race pages");
    });
}

(function main() {

    var raceName = process.argv[2] || "Ironman Florida";

    //Get all race history.
    var races = raceHistory(raceName);

    // Search for a races by year
    var year = process.argv[3];

    log.info("Year =>%s", year);

    if (year)
        races = _.where(races, {
            year: parseInt(year, 0)
        });

    async.each(races, getRaceData, function(err) {
        if (err)
            log.info("Error getting race history data =>%s", err);
    });

})();
