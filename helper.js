var _s = require('underscore.string');

function getFolderName(race){
    var foldername  = _s.underscored(_s.sprintf('%s', race.name));

    return foldername;
}

function getFileName(race){
    var fileName = _s.underscored(_s.sprintf('%s_%s.html', race.name, race.year));

    return fileName;
}

exports.getFolderName = getFolderName;
exports.getFileName = getFileName;
