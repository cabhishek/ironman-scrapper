var scrape_with_time = require('./scrape_with_time'),
    scrape_without_time = require('./scrape_without_time'),
    scrape_new_site = require('./scrape_new_site'),
    fs = require('fs'),
    _ = require('underscore');

module.exports = function scrapeData(data, scrapperName) {

    scrapperName = typeof scrapperName !== 'undefined' ? scrapperName : "with_time" ;

    console.log('Scrapper Name ->' + scrapperName);

    var scrapers ={};

    _.extend(scrapers, {"with_time": scrape_with_time});
    _.extend(scrapers, {"without_time": scrape_without_time});
    _.extend(scrapers, {"new_site": scrape_new_site});

    return scrapers[scrapperName](data);
};
