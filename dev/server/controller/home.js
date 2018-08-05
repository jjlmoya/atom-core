const page = 'home';
const config = require('../config').router()[page];
const NavPages = require('../services/navPages');

module.exports = function (app) {
    app.get(config.path, function (req, res) {
        NavPages.service.get(function (data) {
            res.render(config.view, data)
        });
    });
};