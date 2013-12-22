var cheerio = require('cheerio'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    util = require('util'),
    fs = require('fs');

module.exports = function scrapeData(data) {

    var $ = cheerio.load(data);

    var rows = [];

    $('#divResults .clsResult').map(function() {

        var row = $(this);

        // Structured as per data found @ http://storage.athlinks.com/time.aspx?eventid=115006&courseid=156044&genderpage=A14
        var claimed = row.find("img").attr('src') === '/images/icoMemberSm.gif' ? 0 : 1;

        var a = row.find(':nth-child(2)').text();
        var g = row.find(':nth-child(3)').text();
        var o = row.find(':nth-child(4)').text();
        var ago = util.format("%s/%s/%s", a, g, o);

        var athlete_row = row.find(':nth-child(5)');

        var athlete_ids = _s.trim((row.find('a').attr('href')), "http://athlinks.com/result/").split("/");
        var athlinksId = athlete_ids[athlete_ids.length - 2];

        var names = athlete_row.text().split(' ');

        var firstName = _.first(names);
        var lastName = _.rest(names, 1).join(" ");

        var m_f = row.find(':nth-child(6)').text();
        var age = row.find(':nth-child(7)').text();
        var bib = row.find(':nth-child(8)').text();

        var swim_time = row.find(':nth-child(9)').text();
        var swim_pace = row.find(':nth-child(10)').text();
        var swim_ago = row.find(':nth-child(11)').text();

        var t1 = row.find(':nth-child(12)').text();

        var cycle_time = row.find(':nth-child(13)').text();
        var cycle_speed = row.find(':nth-child(14)').text();
        var cycle_ago = row.find(':nth-child(15)').text();

        var t2 = row.find(':nth-child(16)').text();

        var run_time = row.find(':nth-child(17)').text();
        var run_pace = row.find(':nth-child(18)').text();
        var run_ago = row.find(':nth-child(19)').text();

        var final_time = row.find(':nth-child(20)').text();

        rows.push({
            "claimed": claimed,
            "ago": ago,
            "firstName": firstName,
            "lastName": lastName,
            "athlinksId": athlinksId,
            "m_f": m_f,
            "age": age,
            "bib": bib,
            "swimTime": swim_time,
            "swimPace": swim_pace,
            "swimAgo": _cleanupAgo(swim_ago),
            "t1": t1,
            "cycleTime": cycle_time,
            "cycleSpeed": cycle_speed,
            "cycleAgo": _cleanupAgo(cycle_ago),
            "t2": t2,
            "runTime": run_time,
            "runPace": run_pace,
            "runAgo": _cleanupAgo(run_ago),
            "finalTime": final_time
        });
    });

    return rows;
};

function _cleanupAgo(value){
    return value.split(" / ").join("/");
}
