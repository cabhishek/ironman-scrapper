var raceHistory = require('./races/raceHistory'),
    helper = require('./helper'),
    http = require('client-http'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    get_url = require('./url'),
    mkdirp = require('mkdirp'),
    async = require('async'),
    path = require('path'),
    fs = require('fs');

var raceName = "Ironman Florida";

function downloadData(racePage, callback) {

    var url = get_url(racePage);
    var fileName = helper.getFileName(racePage);

    http.get(url, function(raw_html, err) {

        fs.writeFile(racePage.folderName + '/' + fileName, raw_html, function(err) {

            if (err) {
                console.log(err);
            } else {
                console.log(_s.sprintf("The %s was saved!", fileName));
            }
        });
    });
}

function getRaceData(race, callback) {

    var folderName = helper.getFolderName(race);

    //Create folder to save all data
    mkdirp(folderName, function(err) {});

    pages = _.range(1, race.pages + 1);

    console.log("Created folderName =>" + folderName);

    racePages = [];

    pages.forEach(function(page) {
        racePages.push(_.clone(_.extend(race, {
            'page': page,
            'folderName': folderName
        })));
    });


    async.each(racePages, downloadData, function(err) {
        if (err !== null)
            console.log("Error downloading race page data =>" + err);
        console.log("Done downloading all race pages");
    });
}

(function main() {

    //Get all race history.
    var races = raceHistory(raceName);

    async.each(races, getRaceData, function(err) {
        if (err !== null)
            console.log("Error getting race history data =>" + err);
    });

})();
