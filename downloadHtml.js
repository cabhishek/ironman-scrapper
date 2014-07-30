var raceHistory = require('./raceConfig/raceHistory'),
    helper = require('./utils/helper'),
    http = require('client-http'),
    _ = require('underscore'),
    getUrl = require('./utils/url'),
    mkdirp = require('mkdirp'),
    async = require('async'),
    path = require('path'),
    fs = require('fs'),
    Log = require('log'),
    log = new Log('info');

(function () {

    var raceName = process.argv[2] || "Ironman Florida",
        races = raceHistory(raceName),
        years = process.argv[3]

    if (years)
        races = helper.filterByYear(races, years)

    async.each(races, getRaceData, function(err) {
        if (err) throw err
    })

})()

function getRaceData(race, callback) {

    var folderName = helper.getFolderName(race),
        pages = helper.createPages(race),
        racePages = []

    //Create folder to save all data
    mkdirp(folderName, function(err) {})

    log.info("Created folderName =>%s", folderName)
    log.info("Race name =>%s", race.name)
    log.info("Race year =>%s", race.year)
    log.info("Total pages =>%s", race.pages)

    _.each(pages, function(page) {
        racePages.push(_.clone(_.extend(race, {
            'page': page,
            'folderName': folderName
        })))
    })

    async.each(racePages, downloadRawHtml, function(err) {
        if (err) throw err

        console.log("Done downloading all race pages")
    })
}

function downloadRawHtml(racePage, callback) {

    var url = getUrl(racePage),
        fileName = helper.getFileName(racePage)

    http.get(url, function(raw_html, err) {

        fs.writeFile(racePage.folderName + '/' + fileName, raw_html, function(err) {

            if (err) throw err

            log.info("The %s was saved!", fileName)
        })
    })
}
