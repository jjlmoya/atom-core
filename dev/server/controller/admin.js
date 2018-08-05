const page = 'admin';
const config = require('../config').router()[page];
const NavPages = require('../services/navPages');
const AdminService = require('../services/admin');
const parentPath = config.path;
const adminLayout = {layout: 'panel.hbs'};
const _ = require('lodash');

module.exports = function (app) {
    let model = Object.assign({}, {}, adminLayout);
    app.get(parentPath, function (req, res) {
        NavPages.service.get(function (navData) {
            model = Object.assign({}, navData, model);
            AdminService.navigation.get(function (adminData) {
                model = Object.assign({}, adminData, model);
                res.render(config.view, model);
            });
        })
    });
    app.get(parentPath + '/:page', function (req, res) {
        const page = req.params.page;
        const pageConfiguration = getConfigByPage(page);
        console.log(pageConfiguration);
        if (pageConfiguration) {
            AdminService.navigation.get(function (data) {
                adminLayout.activePageSlug = parentPath + '/' + pageConfiguration.path;
                adminLayout.activePage = pageConfiguration.display;
                const model = Object.assign({}, data, adminLayout);
                res.render(pageConfiguration.view, model)
            });
        } else {
            res.redirect(parentPath);
        }

    });


    function getConfigByPage(page) {
        return _.first(_.filter(config, {path: page}));
    }
};