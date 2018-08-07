let watchService = require('../services/watch.service');
let Config = require('../config');
let AdminRouter = Config.router().admin;

module.exports = function (app) {
    var parentPath = AdminRouter.path + '/' + AdminRouter.watch.path;
    app.post(parentPath + '/create', function (req, res) {
        watchService.create(req, function () {
            res.redirect(parentPath);
        })
    });
};

//CREATE
//READ
//UPDATE
//DELETE
