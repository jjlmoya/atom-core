var $ = $ || require('jquery'),
    RouterMenu = require('../components/routerMenu'),
    Footer = require('../components/footer'),
    Header = require('../components/header'),
    _ = require('lodash');
module.exports = {
    pageSettings: {
        locator: 'settings',
        genericComponents: [Footer, Header],
        model: {
            currentPage: 'settings'
        }
    },
    init: function (onSuccess, genericModel) {
        onSuccess(this.pageSettings.locator, _.merge(this.pageSettings.model, genericModel));
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