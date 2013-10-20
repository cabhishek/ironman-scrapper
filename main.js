var http = require('client-http'),
    scrapeData = require('./scrape'),
    writeCsv = require('./write_csv'),
    async = require('async'),
    fs = require('fs');

function run(page, callback){

        var base_url = 'http://athlinks.com/time.aspx?eventid=115006&courseid=156044&genderpage=';

        var url = base_url + page;

        console.log('Getting data from ->' + url);
        console.log('Page number ->' + page);

        http.get(url, function(raw_html, err){

            var data = scrapeData(raw_html);

            return callback(err, data);
        });
}

var athlink_pages = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14'];


async.concat(athlink_pages, run, function(err, results){

    console.log('Total data row to write ->' + results.length);

    writeCsv('Ironman_70.3_EagleMan_Triathlon_2012_v2.txt', results);
});

