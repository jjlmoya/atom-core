const page = 'admin';
const config = require('../config').router()[page];
const AdminService = require('../services/admin');
const parentPath = config.path;
const adminLayout = {layout: 'panel.hbs'};
const _ = require('lodash');

module.exports = function (app) {
    let model = Object.assign({}, {}, adminLayout);
    app.get(parentPath, function (req, res) {
        AdminService.navigation.get(function (adminData) {
            model = Object.assign({}, adminData, model);
            res.render(config.view, model);
        });
    });
    app.get(parentPath + '/:page', function (req, res) {
        const page = req.params.page;
        const pageConfiguration = getConfigByPage(page);
        if (pageConfiguration) {
            AdminService.navigation.get(function (data) {
                getDataByPage(pageConfiguration, Object.assign({}, data, adminLayout), function (model) {
                    res.render(pageConfiguration.view, model)
                });
            });
        } else {
            res.redirect(parentPath);
        }
    });


    function getConfigByPage(page) {
        return _.first(_.filter(config, {path: page}));
    }

    function getDataByPage(page, currentData, next) {
        const newData = {
            activePageSlug: parentPath + '/' + page.path,
            activePage: page.display,
            adminLayout: adminLayout
        };
        let model = {};
        Object.assign(model, currentData, newData)
        Promise.all(getPromises(page)).then(values => {
            _.forEach(values, function (value) {
                Object.assign(model, model, value)
            });
            next(model);
        });
    }

    function getPromises(page) {
        return _.map(page.services, service => {
            return service()
        })
    }
};