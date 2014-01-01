var _ = require('underscore');

module.exports = function race(raceName) {
    var raceData = {};

    //Add data for ironman qualifiers
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


    if (!raceName)
        return raceData;

    console.log("Getting race data for =>%s", raceName);

    return raceData[raceName];
};
