var cheerio = require('cheerio'),
    _s = require('underscore.string'),
    _ = require('underscore'),
    util = require('util'),
    fs = require('fs');

module.exports = function scrape(rawHtml) {

    var $ = cheerio.load(rawHtml);

    var rows = [];

    $('#divResults .clsResult').map(function() {

        var row = $(this);

        // Structured as per rawHtml found @ http://storage.athlinks.com/time.aspx?eventid=115006&courseid=156044&genderpage=A14
        var claimed = row.find("img").attr('src') === '/images/icoMemberSm.gif' ? 0 : 1;

        var a = row.find(':nth-child(2)').text();
        var g = row.find(':nth-child(3)').text();
        var o = row.find(':nth-child(4)').text();
        var ago = util.format("%s/%s/%s", a, g, o);

        var athlete_row = row.find(':nth-child(5)');

        var athlete_ids = _s.trim((row.find('a').attr('href')), "http://athlinks.com/result/").split("/");
        var athlinksId = athlete_ids[athlete_ids.length - 2];

        var names = _s.capitalize(_s.humanize(athlete_row.text())).split(' ');

        var firstName = _.first(names);
        var lastName = _.rest(names, 1).join(' ');

        var m_f = row.find(':nth-child(6)').text();
        var age = row.find(':nth-child(7)').text();
        var bib = row.find(':nth-child(8)').text();

        var swimTime = row.find(':nth-child(9)').text();
        var swimPace = row.find(':nth-child(10)').text();
        var swimAgo = row.find(':nth-child(11)').text();

        var t1 = row.find(':nth-child(12)').text();

        var cycleTime = row.find(':nth-child(13)').text();
        var cycleSpeed = row.find(':nth-child(14)').text();
        var cycleAgo = row.find(':nth-child(15)').text();

        var t2 = row.find(':nth-child(16)').text();

        var runTime = row.find(':nth-child(17)').text();
        var runPace = row.find(':nth-child(18)').text();
        var runAgo = row.find(':nth-child(19)').text();

        var finalTime = row.find(':nth-child(20)').text();

        rows.push({
            "claimed": claimed,
            "ago": ago,
            "firstName": firstName,
            "lastName": lastName,
            "athlinksId": athlinksId,
            "m_f": m_f,
            "age": age,
            "bib": bib,
            "swimTime": swimTime,
            "swimPace": swimPace,
            "swimAgo": _cleanupAgo(swimAgo),
            "t1": t1,
            "cycleTime": cycleTime,
            "cycleSpeed": cycleSpeed,
            "cycleAgo": _cleanupAgo(cycleAgo),
            "t2": t2,
            "runTime": runTime,
            "runPace": runPace,
            "runAgo": _cleanupAgo(runAgo),
            "finalTime": finalTime
        });
    });

    return rows;
};

function _cleanupAgo(value){
    return value.split(" / ").join("/");
}
