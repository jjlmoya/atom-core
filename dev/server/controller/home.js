const page = 'home';
const config = require('../config').router()[page];
const NavPages = require('../services/navPages');
const _ = require('lodash');

module.exports = function (app) {
    app.get(config.path, function (req, res) {
        Promise.all([NavPages.service.get()]).then(values => {
            let model = {};
            _.forEach(values, function (value) {
                Object.assign(model, model, value)
            });
            res.render(config.view, model);
        });
    });
};