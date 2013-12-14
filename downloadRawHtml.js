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

var raceName = "Ironman Australia";

(function download() {

    var history = raceHistory(raceName);

    history.forEach(function(race) {

        var url = get_url(race);

        var foldername = helper.getFolderName(race);
        var filename = helper.getFileName(race);

        mkdirp(foldername, function(err) {

            http.get(url, function(raw_html, err) {

                fs.writeFile(foldername + '/' + filename, raw_html, function(err) {

                    if (err) {
                        console.log(err);
                    } else {
                        console.log(_s.sprintf("The %s was saved!", filename));
                    }
                });
            });
        });
    });
})();
