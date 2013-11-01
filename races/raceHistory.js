var floridaHistory = require('./florida').floridaHistory,
    arizonaHistory = require('./arizona').arizonaHistory,
    cozumelHistory = require('./cozumel').cozumelHistory,
    westernAustraliaHistory = require('./westernAustralia').westernAustraliaHistory,
    newZealandHistory = require('./newZealand').newZealandHistory,
    southAfricaHistory = require('./southAfrica').southAfricaHistory,
    australiaHistory = require('./australia').australiaHistory,
    _ = require('underscore');

module.exports = function raceHistory(raceName){
    var raceDatas = {};

    _.extend(raceDatas, floridaHistory);
    _.extend(raceDatas, arizonaHistory);
    _.extend(raceDatas, cozumelHistory);
    _.extend(raceDatas, westernAustraliaHistory);
    _.extend(raceDatas, newZealandHistory);
    _.extend(raceDatas, southAfricaHistory);
    _.extend(raceDatas, australiaHistory);

    return raceDatas[raceName];
};

