var cheerio = require('cheerio'),
    fs = require('fs'),
    writeCsv = require('./write_csv');

module.exports = function scrapeData(data) {

      var $ = cheerio.load(data);

      var rows = [];

      $('#divResults .clsResult').map(function(){

        var row = $(this);

        var a = row.find(':nth-child(2)').text();
        var g = row.find(':nth-child(3)').text();
        var o = row.find(':nth-child(4)').text();

        var athlete = row.find(':nth-child(5)').text();

        var m_f = row.find(':nth-child(6)').text();
        var a_2 = row.find(':nth-child(7)').text();
        var bib = row.find(':nth-child(8)').text();

        var swim_time = row.find(':nth-child(9)').text();
        var swim_pace = row.find(':nth-child(10)').text();
        var swim_a_g_o = row.find(':nth-child(11)').text();

        var time = row.find(':nth-child(12)').text();

        var cycle_time = row.find(':nth-child(13)').text();
        var cycle_speed = row.find(':nth-child(14)').text();
        var cycle_a_g_o = row.find(':nth-child(15)').text();

        var time_2 = row.find(':nth-child(16)').text();

        var run_time = row.find(':nth-child(17)').text();
        var run_pace = row.find(':nth-child(18)').text();
        var run_a_g_o = row.find(':nth-child(19)').text();

        var final = row.find(':nth-child(20)').text();

        rows.push({
            "A": a,
            "G": g,
            "O": o,
            "Athelete": athlete,
            "M/F": m_f,
            "A2": a_2,
            "Bib": bib,
            "Swim_Time": swim_time,
            "Swim_Pace": swim_pace,
            "Swim_A_G_O": swim_a_g_o,
            "Time": time,
            "Cycle_time": cycle_time,
            "Cycle_speed": cycle_speed,
            "Cycle_a_g_o": cycle_a_g_o,
            "Time_2": time_2,
            "Run_time": run_time,
            "Run_pace": run_pace,
            "Run_a_g_o": run_a_g_o,
            "Final": final
        });
      });

    writeCsv('Ironman 70.3 EagleMan Triathlon 2012.txt', rows);
  };


