module.exports = function (app) {
    var db = require('./db');

    require('./controller/home')(app, db);
    require('./controller/modal')(app);



};