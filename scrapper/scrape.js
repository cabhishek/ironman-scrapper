var scrape_with_time = require('./scrape_with_time'),
    scrape_without_time = require('./scrape_without_time'),
    scrape_new_site = require('./scrape_new_site'),
    fs = require('fs'),
    _ = require('underscore'),
    Log = require('log'),
    log = new Log('info');

module.exports = function scrapeData(rawHtml, scraperName) {

    scraperName = typeof scraperName !== 'undefined' ? scraperName : "with_time" ;

    log.info('Scrapper Name ->%s', scraperName);

    var scrapers ={};

    //Append all different types of scrapers.
    //format -> {scraperName: scraper}
    _.extend(scrapers, {"with_time": scrape_with_time});
    _.extend(scrapers, {"without_time": scrape_without_time});
    _.extend(scrapers, {"new_site": scrape_new_site});

    return scrapers[scraperName](rawHtml);
};
