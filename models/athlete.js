var Bookshelf = require('bookshelf').Mysql;

var Athlete = Bookshelf.Model.extend({
    tableName: 'athletes',

    hasTimestamps: ['created', 'modified']
});

module.exports = Athlete;
