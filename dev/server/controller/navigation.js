const navPages = require('../services/navPages');
const Config = require('../config');
module.exports = function (app) {
    app.post('/navElements', function (req, res) {
        console.log('-----> %o', navPages)
        navPages.service.set(req.body, function () {
            res.redirect(Config.router().admin.path);
        });
    });
};