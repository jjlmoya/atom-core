const navPages = require('../services/navbar.service');
const Config = require('../config');
module.exports = function (app) {
    const parentPath = Config.router().admin.path + '/' + Config.router().admin.navigation.path;
    app.post(parentPath + '/create', function (req, res) {
        navPages.create(req, function () {
            res.redirect(parentPath);
        });
    });

    app.post(parentPath + '/:id/update', function (req, res) {
        navPages.update(req).then(() => {
            res.redirect(parentPath);
        })
    });

    app.post(parentPath + '/:id/delete', function (req, res) {
        navPages.delete(req).then(() => {
            res.redirect(parentPath);
        })
    });



};