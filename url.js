var _s = require('underscore.string'),
    url = require("url");


module.exports = function get_url(race){

        var base_url = "http://athlinks.com/time.aspx";
        var params = _s.sprintf("?eventid=%s&courseid=%s&mode=%s&genderpage=%s", race.eventid, race.courseid, race.mode, race.page);

        var athlinks_url = base_url + params;


        console.log('Getting data from ->' + athlinks_url);
        console.log('Page number ->' + race.page);

        return athlinks_url;
};
