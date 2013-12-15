var _s = require('underscore.string');

function getFolderName(race){
    var foldername  = _s.underscored(_s.sprintf('%s/%s', race.name, race.year));

    return foldername;
}

function getFileName(race){
    var fileName = _s.underscored(_s.sprintf('%s_%s_page_%s.html', race.name, race.year, race.page));

    return fileName;
}

exports.getFolderName = getFolderName;
exports.getFileName = getFileName;
