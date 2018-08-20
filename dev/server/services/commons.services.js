const _ = require('lodash');
exports.read = function (config) {
    return new Promise(function (resolve) {
            resolve({
                activePageSlug: config.path
            });
        }
    );
};

exports.join = function (values) {
    let model = {};
    _.forEach(values, function (value) {
        Object.assign(model, model, value)
    });
    return model;
};

exports.getPromises = function (page) {
    return _.map(page.services.read, service => {
        return service();
    });
};