const config = require('../config').router().modal;
module.exports = function (app) {
    app.get(config.path, function (req, res) {
        res.render(config.view);
    });
};