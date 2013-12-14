var floridaHistory = require('./florida').floridaHistory,
    arizonaHistory = require('./arizona').arizonaHistory,
    cozumelHistory = require('./cozumel').cozumelHistory,
    westernAustraliaHistory = require('./westernAustralia').westernAustraliaHistory,
    newZealandHistory = require('./newZealand').newZealandHistory,
    southAfricaHistory = require('./southAfrica').southAfricaHistory,
    australiaHistory = require('./australia').australiaHistory,
    _ = require('underscore');

module.exports = function raceHistory(raceName){
    var raceData = {};

    //Add data of a particular race
    _.extend(raceData, floridaHistory);
    _.extend(raceData, arizonaHistory);
    _.extend(raceData, cozumelHistory);
    _.extend(raceData, westernAustraliaHistory);
    _.extend(raceData, newZealandHistory);
    _.extend(raceData, southAfricaHistory);
    _.extend(raceData, australiaHistory);

    return raceData[raceName];
};

