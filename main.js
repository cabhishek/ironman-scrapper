var http = require('client-http'),
    scrapeData = require('./scrape'),
    writeCsv = require('./write_csv'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    async = require('async'),
    fs = require('fs');

var base_url = 'http://athlinks.com/time.aspx';

function get_data(race, callback){

        var params = _s.sprintf("?eventid=%s&courseid=%s&genderpage=%s", race.eventid, race.courseid, race.page);

        var url = base_url + params;

        console.log('Getting data from ->' + url);
        console.log('Page number ->' + race.page);

        http.get(url, function(raw_html, err){

            var data = scrapeData(raw_html);

            return callback(err, data);
        });
}

var races = [{
    name : "Ironman Asia-Pacific Championship",
    eventid: 176220,
    courseid:242050,
    year:2012,
    lastpage:4
},
{
    name : "Ironman South Africa",
    eventid: 170929,
    courseid:234026,
    year: 2012,
    lastpage:4
},
{
    name : "Ironman Australia",
    eventid: 123206,
    courseid:167877,
    year: 2011,
    lastpage:4
},
{
    name : "Ironman Australia",
    eventid: 99550,
    courseid:137618,
    year: 2006,
    lastpage:4
}];

races.forEach(function(race){

    var athlink_races = [];
    var pages = _.range(1, race.lastpage + 1);

    pages.forEach(function(page){

        var gender_page = _s.sprintf('A%s', page);
        var cloned_race = _.clone(race);

        athlink_races.push(_.extend(cloned_race, {page:gender_page}));
    });

    // console.log('athlink_races ->'+ athlink_races);

    async.concat(athlink_races, get_data, function(err, results){

        console.log('Total data row to write ->' + results.length);

        writeCsv(_s.underscored(_s.sprintf('%s_%s.txt', race.name, race.year)), results);

    });
});


