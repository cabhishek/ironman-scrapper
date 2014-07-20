var _ = require('underscore'),
    fs = require('fs'),
    settings = require('./../settings'),
    Log = require('log'),
    log = new Log('info');

module.exports = function(raceName) {
    var raceData = {},
        files = fs.readdirSync(settings.PROJECT_DIR + '/races');

    _.each(files, function(file) {

        var path = settings.PROJECT_DIR + '/races/' + file,
            fileData = require(path);

        _.extend(raceData, fileData)
    });

    if (!raceName)
        return raceData;

    log.info("Getting race data for =>%s", raceName);

    return raceData[raceName];
};
