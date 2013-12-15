var _s = require('underscore.string'),
    url = require("url");


module.exports = function get_url(race) {

    var base_url = "http://storage.athlinks.com/time.aspx";
    var params = _s.sprintf("?eventid=%s&courseid=%s&genderpage=A%s", race.eventid, race.courseid, race.page);

    var athlinks_url = base_url + params;


    console.log('Getting data from ->' + athlinks_url);
    console.log('Page number ->' + race.page);

    return athlinks_url;
};
