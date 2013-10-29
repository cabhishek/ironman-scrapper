var raceHistory = require('./races/raceHistory'),
    scrapeData = require('./scrape'),
    writeCsv = require('./writeCsv'),
    getFolderName = require('./helper').getFolderName,
    getFileName = require('./helper').getFileName,
    http = require('client-http'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    async = require('async'),
    mkdirp = require('mkdirp'),
    fs = require('fs');

var raceName = "Ironman Florida";

var history = raceHistory(raceName);

history.forEach(function(race){

    var foldername  = getFolderName(race);
    var filename = getFileName(race);

    fs.readFile(foldername + '/' + filename, function(err, raw_html){
        var data = scrapeData(raw_html);

        mkdirp(foldername + '/data', function(err){

            var dataFile = _s.underscored(_s.sprintf('%s/data/%s_%s.csv', foldername, race.name, race.year));

            writeCsv(dataFile, data);

            console.log('Done saving ->' + dataFile);
        });

    });
});




