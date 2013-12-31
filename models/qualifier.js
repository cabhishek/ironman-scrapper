var Bookshelf = require('bookshelf').Mysql;

var Qualifier = Bookshelf.Model.extend({
    tableName: 'qualifiers',

    hasTimestamps: ['created', 'modified']


});

module.exports = Qualifier;
