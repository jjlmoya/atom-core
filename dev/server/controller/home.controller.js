const config = require('../config').router().home;
const NavPages = require('../services/navbar.service');
const _ = require('lodash');

module.exports = function (app) {
    app.get(config.path, function (req, res) {
        Promise.all([NavPages.read()]).then(values => {
            let model = {};
            _.forEach(values, function (value) {
                Object.assign(model, model, value)
            });
            res.render(config.view, model);
        });
    });
};