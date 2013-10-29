var raceHistory = require('./races/raceHistory'),
    getFolderName = require('./helper').getFolderName,
    getFileName = require('./helper').getFileName,
    fs = require('fs'),
    http = require('client-http'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    async = require('async'),
    get_url = require('./url'),
    mkdirp = require('mkdirp'),
    path = require('path');

var raceName = "Ironman Florida";

(function download(){

    var history = raceHistory(raceName);

    history.forEach(function(race){

        var url = get_url(race);

        var foldername  = getFolderName(race);
        var filename = getFileName(race);

        mkdirp(foldername, function(err){

            http.get(url, function(raw_html, err){

                fs.writeFile(foldername + '/' + filename, raw_html, function(err){

                    if(err) {
                        console.log(err);
                    } else {
                        console.log(_s.sprintf("The %s was saved!", filename));
                    }
                });
             });
        });
    });
})();
