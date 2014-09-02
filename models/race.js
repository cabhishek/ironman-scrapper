var Bookshelf = require('bookshelf').Mysql

var Race = Bookshelf.Model.extend({
    tableName: 'races',

    hasTimestamps: ['created', 'modified']

})

module.exports = Race
