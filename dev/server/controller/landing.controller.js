const config = require('../config').router();
const NavPages = require('../services/navbar.service');
const Commons = require('../services/commons.services');
const home = config.home;
const modal = config.modal;
const bannerLand = config.bannerLand;

module.exports = function (app) {
    app.get(home.path, function (req, res) {
        Promise.all([
            NavPages.read(),
            Commons.read(config)
        ]).then(values => {
            res.render(home.view, Commons.join(values));
        });
    });
    app.get(bannerLand.path, function (req, res) {
        Promise.all([
            NavPages.read(),
            Commons.read(config)
        ]).then(values => {
            res.render(bannerLand.view, Commons.join(values));
        });
    });
    app.get(modal.path, function (req, res) {
        Promise.all([
            NavPages.read(),
            Commons.read(config)
        ]).then(values => {
            res.render(modal.view, Commons.join(values));
        });
    });

};
