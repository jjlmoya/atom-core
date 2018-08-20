const config = require('../config').router().admin;
const AdminService = require('../services/adminRouter.service');
const parentPath = config.path;
const CommonsService = require('../services/commons.services');
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

    app.get(parentPath + '/:page/:id', function (req, res) {
        const page = req.params.page;
        const pageConfiguration = getConfigByPage(page);
        if (pageConfiguration) {
            AdminService.navigation.get(function (data) {
                getDataById(req.params.id, pageConfiguration, Object.assign({}, data, adminLayout), function (model) {
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

    function getCommonConfiguration(page, endpoint, isUpdate) {
        const composePath = parentPath + '/' + page.path;
        return {
            activePageSlug: composePath,
            activePage: page.display,
            adminLayout: adminLayout,
            endpoint: composePath + endpoint,
            isUpdate: isUpdate
        };
    }

    function getDataById(id, page, currentData, next) {
        let path = '/' + id + '/update';
        const newData = getCommonConfiguration(page, path, true);
        let model = {};
        Object.assign(model, currentData, newData);
        page.services.readByID(id).then(val => {
            next(Object.assign(model, model, val));
        });
    }

    function getDataByPage(page, currentData, next) {
        const newData = getCommonConfiguration(page, '/create');
        let model = {};
        Object.assign(model, currentData, newData);
        Promise.all(CommonsService.getPromises(page)).then(values => {
            next(Object.assign(model, model, CommonsService.join(values)));
        });
    }
};