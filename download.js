var raceHistory = require('./raceConfig/raceHistory'),
    helper = require('./utils/helper'),
    getUrl = require('./utils/url'),
    _ = require('underscore'),
    mkdirp = require('mkdirp'),
    async = require('async'),
    fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2)),
    Log = require('log'),
    log = new Log('info'),
    http = require('client-http');


// Main function to kick start things
// years if passed are in comma seperated format e.g "2013,2012,1998"
(function() {

    if (!argv.name)
        throw "Enter a valid race name"

    var races = raceHistory(argv.name)

    if (argv.years)
        races = helper.filterByYear(races, argv.years)

    async.each(races, downloadRaceData, function(err) {
        if (err) throw err
    })

})()

function downloadRaceData(race, callback) {

    var folderName = helper.getFolderName(race),
        pages = helper.createPages(race),
        racePages = []

    //Create folder to save all raw race data html
    mkdirp(folderName, function(err) {})

    log.info("Created folderName =>%s", folderName)
    log.info("Race name =>%s", race.name)
    log.info("Race year =>%s", race.year)
    log.info("Total pages =>%s", race.pages)

    // Race pages which are downloaded in parallel
    _.each(pages, function(page) {
        racePages.push(_.clone(_.extend(race, {
            'page': page,
            'folderName': folderName
        })))
    })

    async.each(racePages, downloadRawHtml, function(err) {
        if (err) throw err

        log.info("Done downloading all race pages")
    })
}

function downloadRawHtml(racePage, callback) {
    // Athlinks URL
    var url = getUrl(racePage),
        fileName = helper.getFileName(racePage)

    http.get(url, function(html) {

        fs.writeFile(racePage.folderName + '/' + fileName, html, function(err) {

            if (err) throw err

            log.info("The %s was saved!", fileName)
        })
    })
}
