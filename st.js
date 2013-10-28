var _ = require('underscore'),
    _s = require('underscore.string');


console.log(_s.underscored('hello world'));
// var races = [{
//     name : "Ford Ironman Cozumel 2009",
//     eventid: 115006,
//     courseid:156044,
//     lastpage:14
// }
// ];


// races.forEach(function(race){

//     var athlink_pages = _.range(1, race.lastpage + 1);
//     console.log(athlink_pages);
//     var fin = [];

//     athlink_pages.forEach(function(page){

//         var gender_page = _s.sprintf('A%s', page);
//         var cloned_race = _.clone(race);

//         fin.push(_.extend(cloned_race, {page:gender_page}));
//     });

//     console.log(fin);
// });


