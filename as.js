var async = require('async'),
    http = require('client-http');

function run (counter, callback) {

   http.get("http://google.jp", function(raw_html, err) {

        console.log("Counter ->" + counter);

        return callback(err, counter);
  });
}

async.map([1, 2, 3, 4, 5, 6, 7, 8, 9], run, function(err, results) {
    console.log(results);
});
