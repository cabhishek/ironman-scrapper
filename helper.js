var _ = require('underscore'),
    _s = require('underscore.string');

function getFolderName(race) {

    var dataFolder = "htmldata";

    var foldername = _s.underscored(_s.sprintf('%s/%s/%s', dataFolder, race.name, race.year));

    return foldername;
}

function getFileName(race) {
    var fileName = _s.underscored(_s.sprintf('%s_%s_page_%s.html', race.name, race.year, race.page));

    return fileName;
}

function createPages(race) {
    return _.range(1, race.pages + 1);
}

exports.getFolderName = getFolderName;
exports.getFileName = getFileName;
exports.createPages = createPages;
