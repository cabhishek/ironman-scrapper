var Bookshelf = require('bookshelf');

function initialize(){
    Bookshelf = Bookshelf.initialize({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            database: 'datathletics',
            charset: 'utf8'
        }
    });

    return Bookshelf;
}

module.exports = initialize;
