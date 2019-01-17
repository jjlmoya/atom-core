const config = require('../config').router();
const NavPages = require('../services/navbar.service');
const Commons = require('../services/commons.services');
const MockService = require('../services/mocks/mock.service');
const home = config.home;
const modal = config.modal;
const slider = config.slider;
const tetra = config.tetra;
const bonseo = config.bonseo;
const aviator = config.aviator;

module.exports = function (app) {
    app.get(home.path, function (req, res) {
        Promise.all([
            NavPages.read(),
            Commons.read(home)
        ]).then(values => {
            res.render(home.view, Commons.join(values));
        });
    });
    app.get(modal.path, function (req, res) {
        Promise.all([
            NavPages.read(),
            Commons.read(modal)
        ]).then(values => {
            res.render(modal.view, Commons.join(values));
        });
    });

    app.get(slider.path, function (req, res) {
        Promise.all([
            NavPages.read(),
            Commons.read(slider),
            MockService.readSlider()
        ]).then(values => {
            res.render(slider.view, Commons.join(values));
        });
    });
    app.get(tetra.path, function (req, res) {
        Promise.all([
            NavPages.read(),
            Commons.read(tetra)
        ]).then(values => {
            res.render(tetra.view, Commons.join(values));
        });
    });
    app.get(bonseo.path, function (req, res) {
        Promise.all([
            Commons.read(bonseo)
        ]).then(values => {
            console.log(Commons.join(values));
            res.render(bonseo.view, Commons.join(values));
        });
    });
    app.get(bonseo.services.path, function (req, res) {
        console.log(bonseo.services.path);
        Promise.all([
            Commons.read(bonseo.services)
        ]).then(values => {
            console.log(Commons.join(values));
            res.render(bonseo.services.view, Commons.join(values));
        });
    });

    app.get(aviator.path, function (req, res) {
        console.log(aviator.path);
        Promise.all([
            Commons.read(aviator)
        ]).then(values => {
            console.log(Commons.join(values));
            res.render(aviator.view, Commons.join(values));
        });
    });

    app.get(bonseo.learn.path, function (req, res) {
        console.log(bonseo.learn.path);
        Promise.all([
            Commons.read(bonseo.learn)
        ]).then(values => {
            console.log(Commons.join(values));
            res.render(bonseo.learn.view, Commons.join(values));
        });
    });
};
