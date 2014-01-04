var withTransitionTime = require('./withTransitionTime'),
    withoutTransitionTime = require('./withoutTransitionTime'),
    withSingleTransitionTime = require('./withSingleTransitionTime'),
    newSite = require('./newSite'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info'),
    fs = require('fs');

module.exports = function scrape(rawHtml, scraperName) {

    scraperName = (typeof scraperName !== 'undefined') ? scraperName : "with_time";

    var scrapers = {};

    //Append all different types of scrapers.
    //format -> {scraperName: scraper}
    _.extend(scrapers, {
        "with_time": withTransitionTime
    });
    _.extend(scrapers, {
        "without_time": withoutTransitionTime
    });
    _.extend(scrapers, {
        "with_single_time": withSingleTransitionTime
    });

    return scrapers[scraperName](rawHtml);
};
