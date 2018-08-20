const ComponentService = require('../services/devBusiness/component.services');
const CommonsService = require('../services/commons.services');
const Config = require('../config');
const page = Config.router().components;

module.exports = function (app) {

    const adminParent = Config.router().admin.path + '/' + Config.router().admin.component.path;
    app.post(adminParent + '/create', function (req, res) {
        ComponentService.create(req, function () {
            res.redirect(adminParent);
        });
    });

    app.post(adminParent + '/:id/update', function (req, res) {
        ComponentService.update(req).then(() => {
            res.redirect(adminParent);
        })
    });

    app.post(adminParent + '/:id/delete', function (req, res) {
        ComponentService.delete(req).then(() => {
            res.redirect(adminParent);
        })
    });

    app.get(page.path, function (req, res) {
        Promise.all(CommonsService.getPromises(page)).then((result) => {
            let formattedData = CommonsService.join(result);
            res.render(page.view, Object.assign(formattedData, formattedData, {activePageSlug: page.path}));
        });
    });

    app.get(page.path + '/:slug', function (req, res) {
        page.services.readBySlug(req.params.slug).then(val => {
            console.log('val => %o', val);
            res.render(page.component.view, val);
        });
    });
};