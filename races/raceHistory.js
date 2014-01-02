var _ = require('underscore');

module.exports = function race(raceName) {
    var raceData = {};

    //Add data for ironman qualifiers
    _.extend(raceData, require('./703asiapacificchampionships'));
    _.extend(raceData, require('./asiapacificchampionships'));
    _.extend(raceData, require('./florida'));
    _.extend(raceData, require('./arizona'));
    _.extend(raceData, require('./cozumel'));
    _.extend(raceData, require('./westernAustralia'));
    _.extend(raceData, require('./newZealand'));
    _.extend(raceData, require('./southAfrica'));
    _.extend(raceData, require('./australia'));
    _.extend(raceData, require('./croix'));
    _.extend(raceData, require('./laketahoe'));
    _.extend(raceData, require('./kona'));
    _.extend(raceData, require('./malaysia'));
    _.extend(raceData, require('./wales'));
    _.extend(raceData, require('./wisconsin'));
    _.extend(raceData, require('./japan'));
    _.extend(raceData, require('./louisville'));
    _.extend(raceData, require('./copenhagen'));
    _.extend(raceData, require('./eurochampionships'));
    _.extend(raceData, require('./northamericanchampionships'));
    _.extend(raceData, require('./sweden'));
    _.extend(raceData, require('./canada'));
    _.extend(raceData, require('./switzerland'));
    _.extend(raceData, require('./lakeplacid'));
    _.extend(raceData, require('./uk'));
    _.extend(raceData, require('./france'));
    _.extend(raceData, require('./fulleurochampionships'));
    _.extend(raceData, require('./coeurdalene'));
    _.extend(raceData, require('./austria'));
    _.extend(raceData, require('./703japan'));
    _.extend(raceData, require('./703eagleman'));
    _.extend(raceData, require('./cairns'));
    _.extend(raceData, require('./703hawaii'));
    _.extend(raceData, require('./florianopolis'));
    _.extend(raceData, require('./lanzarote'));
    _.extend(raceData, require('./texas'));
    _.extend(raceData, require('./loscabos'));


    if (!raceName)
        return raceData;

    console.log("Getting race data for =>%s", raceName);

    return raceData[raceName];
};
