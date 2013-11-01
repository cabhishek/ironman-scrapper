var scrape_with_time = require('./scrape_with_time'),
    scrape_without_time = require('./scrape_without_time'),
    fs = require('fs'),
    _ = require('underscore');

module.exports = function scrapeData(data, name) {

    name = typeof name !== 'undefined' ? name : "with_time" ;

    console.log('scrapper name ->' + name);

    var scrapers ={};

    _.extend(scrapers, {"with_time": scrape_with_time});
    _.extend(scrapers, {"without_time": scrape_without_time});

    return scrapers[name](data);
};
