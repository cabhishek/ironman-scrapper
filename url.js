var util = require('util'),
    Log = require('log'),
    log = new Log('info');


module.exports = function getUrl(race) {

    var base_url = "http://storage.athlinks.com/time.aspx";
    var params = util.format("?eventid=%s&courseid=%s&genderpage=A%s", race.eventId, race.courseId, race.page);

    var athlinks_url = base_url + params;

    log.info('Getting data from =>%s', athlinks_url);

    return athlinks_url;
};
