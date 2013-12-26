var florida = require('./florida').florida,
    arizona = require('./arizona').arizona,
    cozumel = require('./cozumel').cozumel,
    westernAustralia = require('./westernAustralia').westernAustralia,
    newZealand = require('./newZealand').newZealand,
    southAfrica = require('./southAfrica').southAfrica,
    australia = require('./australia').australia,
    croix = require('./croix').croix,
    _ = require('underscore');

module.exports = function race(raceName){
    var raceData = {};

    //Add data of a particular race
    _.extend(raceData, florida);
    _.extend(raceData, arizona);
    _.extend(raceData, cozumel);
    _.extend(raceData, westernAustralia);
    _.extend(raceData, newZealand);
    _.extend(raceData, southAfrica);
    _.extend(raceData, australia);
    _.extend(raceData, croix);

    return raceData[raceName];
};

