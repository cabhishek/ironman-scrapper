var util = require("util"),
  Log = require("log"),
  log = new Log("info");

module.exports = function getUrl(race) {
  var baseUrl = "http://storage.athlinks.com/time.aspx";
  var params = util.format(
    "?eventid=%s&courseid=%s&genderpage=A%s",
    race.eventId,
    race.courseId,
    race.page
  );
  var athlinksUrl = baseUrl + params;
  log.info("Getting data from =>%s", athlinksUrl);
  return athlinksUrl;
};
