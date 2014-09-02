var Bookshelf = require('bookshelf')

function init(){
    Bookshelf.Mysql = Bookshelf.initialize({
        client: 'mysql',

        connection: {
            host: 'datathletics-db-live.cc3tkob2sz1n.us-west-2.rds.amazonaws.com',
            user: 'datathletics',
            database: 'datathleticsdb',
            password: 'F00lF00l!',
            charset: 'utf8'
        }

        // connection: {
        //     host: '127.0.0.1',
        //     user: 'root',
        //     database: 'datathletics',
        //     charset: 'utf8'
        // }
    })
}

module.exports = init
