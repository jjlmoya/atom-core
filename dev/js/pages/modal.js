var Footer = require('../components/footer'),
    Header = require('../components/header'),
    Menu = require('../components/menu'),
    _ = require('lodash');
module.exports = {
    pageSettings: {
        locator: 'modal',
        genericComponents: [Footer, Header, Menu],
        model: {
            currentPage: 'modal'
        }
    },
    init: function (onSuccess) {
        onSuccess(this.pageSettings.locator, _.merge(this.pageSettings.model));
        _.forEach(this.pageSettings.genericComponents, function (components) {
            components.show();
        });

    },
    hide: function (onSuccess) {
        onSuccess(this.pageSettings.locator);
        _.forEach(this.pageSettings.genericComponents, function (components) {
            components.hide();
        });
    }
};