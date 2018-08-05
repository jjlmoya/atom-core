var page = 'modal';
var config = require('../config').router()[page];
module.exports = function (app) {
    app.get(config.path, function (req, res) {
        res.render(config.view);
    });
};