var http = require('client-http'),
    fs = require('fs'),
    scrapeData = require('./scrape');

(function run(){

    var url = 'http://athlinks.com/time.aspx?eventid=115006&courseid=156044&genderpage=A1';

    console.log('Getting data from ->' + url);

    http.get(url, function(data){
        data && scrapeData(data);
    });

})();


