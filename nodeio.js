var _ = require('underscore'),
    _s = require('underscore.string'),
    get_url = require('./url'),
    scrapeData = require('./scrape'),
    writeCsv = require('./write_csv'),
    async = require('async'),
    http = require('client-http');

var races = [{
    name : "Ironman Florida",
    eventid: 145849,
    courseid:199348,
    mode: 'a',
    page:'M9',
    year:2011
}];

function get_data(race, callback){

        console.log(race);
        var url = get_url(race);

        http.get(url, function(raw_html, err){

            var data = scrapeData(raw_html);
            // console.log('raw_html ->' + data);

            return callback(err, data);
        });
}


async.concat(races, get_data, function(err, results){

    console.log('results ->' + results);
    writeCsv('temp4.txt', results);
});


