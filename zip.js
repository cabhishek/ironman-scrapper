var raceHistory = require('./races/raceHistory'),
    getFolderName = require('./helper').getFolderName,
    getFileName = require('./helper').getFileName,
    admZip = require('adm-zip');

var raceName = "Ironman Cozumel";

var history = raceHistory(raceName);


history.forEach(function(race){

        var zip = new admZip();

        var foldername  = getFolderName(race);
        var filename = getFileName(race);

        zip.addLocalFolder(foldername, 'temp.zip');
    });









