var floridaHistory = require('./florida').floridaHistory,
    _ = require('underscore');

module.exports = function raceHistory(raceName){
    var datas = {};

    _.extend(datas, floridaHistory);

    return datas[raceName];
};
