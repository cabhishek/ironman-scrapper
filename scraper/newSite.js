var cheerio = require('cheerio'),
    fs = require('fs')

module.exports = function scrape(rawHtml) {

    var $ = cheerio.load(rawHtml)

    var rows = []

    $('#EventTable-0 tbody tr').map(function() {

        var row = $(this)

        var a_g_o = row.find(':nth-child(2)').text()

        var athlete = row.find(':nth-child(3)').text()

        var m_f = row.find(':nth-child(4)').text()
        var age = row.find(':nth-child(5)').text()
        var bib = row.find(':nth-child(6)').text()

        var swim_time = row.find(':nth-child(7)').text()
        var swim_pace = row.find(':nth-child(8)').text()
        var swim_a_g_o = row.find(':nth-child(9)').text()

        var time = row.find(':nth-child(10)').text()

        var cycle_time = row.find(':nth-child(11)').text()
        var cycle_speed = row.find(':nth-child(12)').text()
        var cycle_a_g_o = row.find(':nth-child(13)').text()

        var time_2 = row.find(':nth-child(14)').text()

        var run_time = row.find(':nth-child(15)').text()
        var run_pace = row.find(':nth-child(16)').text()
        var run_a_g_o = row.find(':nth-child(17)').text()

        var penalty_time = "N/A"
        var penalty_pace = "N/A"
        var penalty_a_g_o = "N/A"

        // var penalty_time = row.find(':nth-child(18)').text()
        // var penalty_pace = row.find(':nth-child(19)').text()
        // var penalty_a_g_o = row.find(':nth-child(20)').text()

        var final_time = row.find(':nth-child(18)').text()

        var data_row = {
            "A_G_O": a_g_o,
            "Athelete": athlete,
            "M/F": m_f,
            "Age": age,
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
            "Penalty_time": run_time,
            "Penalty_pace": run_pace,
            "Penalty_a_g_o": run_a_g_o,
            "Final_time": final_time
        }

        rows.push(data_row)
    })

    return rows
}
