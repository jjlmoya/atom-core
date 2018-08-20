const watchService = require('../services/watchBusiness/watch.service');
const Config = require('../config');
const AdminRouter = Config.router().admin;

module.exports = function (app) {
    const parentPath = AdminRouter.path + '/' + AdminRouter.watch.path;
    app.post(parentPath + '/create', function (req, res) {
        watchService.create(req, function () {
            res.redirect(parentPath);
        })
    });
};
