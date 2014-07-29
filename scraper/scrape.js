var withTransitionTime = require('./withTransitionTime'),
    withoutTransitionTime = require('./withoutTransitionTime'),
    withSingleTransitionTime = require('./withSingleTransitionTime'),
    marathon = require('./marathon'),
    newSite = require('./newSite'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    fs = require('fs')

module.exports = function scrape(rawHtml, scraperName) {

    scraperName = (typeof scraperName !== 'undefined') ? scraperName : "with_time"

    var scrapers = {}

    //Append all different types of scrapers.
    //format -> {scraperName: scraper}
    _.extend(scrapers, {
        "with_time": withTransitionTime
    })
    _.extend(scrapers, {
        "without_time": withoutTransitionTime
    })
    _.extend(scrapers, {
        "with_single_time": withSingleTransitionTime
    })

    _.extend(scrapers, {
        "marathon": marathon
    })

    return scrapers[scraperName](rawHtml)
}
