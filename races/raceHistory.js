var floridaHistory = require('./florida').floridaHistory,
    arizonaHistory = require('./arizona').arizonaHistory,
    cozumelHistory = require('./cozumel').cozumelHistory,
    _ = require('underscore');

module.exports = function raceHistory(raceName){
    var datas = {};

    _.extend(datas, floridaHistory);
    _.extend(datas, arizonaHistory);
    _.extend(datas, cozumelHistory);

    return datas[raceName];
};
